# Roles and hierarchical permissions — frontend contract proposal

Status: new frontend implementation and contract fixtures. No Roles backend currently exists in the supplied repositories. These routes, DTOs and grants are requirements for a future backend, not a claim that a deployed server supports them. The requested product model supersedes the old direct-permissions-only restriction; it does not restore retired administrator/accountant enums or implicit role-name access.

## Product rules

- The catalog describes **Module → Feature → Actions**. Operation codes and persisted bit positions stay stable; each operation code is unambiguous and each module bit is a distinct power of two.
- A user has either direct permission masks or one linked custom role with per-user additions and exclusions. Additional roles per user are outside this version.
- Effective permissions are `(role permissions OR user additions) AND NOT user exclusions`. The masks remain unsigned 64-bit decimal strings per module. A user exception never changes the shared role.
- Explicit user exclusions override inherited role access. A field cannot be both an addition and an exclusion in one assignment. Existing exceptions remain when the shared role changes.
- Role names do not confer authority. `/auth/me` and sign-in must return the user's server-resolved effective masks. The frontend's calculated preview never supplies authentication authority.
- Roles and assignments remain within the authenticated branch. The server must enforce scope, delegation limits and concurrency, regardless of client-side checks.

## Capability negotiation and existing servers

`GET /permissions/catalog` gains `capabilities: { roles: true }` only when the server implements this contract. Missing capability metadata means `roles: false`; the existing direct-permission workflow remains available with its original HTTP bodies. No speculative Roles request or silent role-to-direct conversion is made for old servers.

New catalog example:

```json
{
  "capabilities": { "roles": true },
  "modules": [{
    "moduleCode": "USERS", "nameAr": "المستخدمون", "nameEn": "Users",
    "features": [{
      "featureCode": "ACCOUNTS", "nameAr": "الحسابات", "nameEn": "Accounts",
      "actions": [{ "code": "USERS_VIEW", "bitValue": "1", "nameAr": "عرض المستخدمين", "nameEn": "View users" }]
    }]
  }]
}
```

Legacy `modules[].definitions[]` is still accepted and displayed under a single `general` presentation group, without guessing business features from operation names. A module must use one wire shape; ambiguous mixed `features` and `definitions`, duplicate module/feature/operation definitions, duplicate bits, non-power-of-two bits and unsigned overflow are rejected. The normalized flat definitions preserve existing operation-code access checks. `auth.canFeature(module, feature, code, branchId)` additionally requires exact feature identity.

The new operation codes belong to Module `USERS`, Feature `ROLES`:

| Code | Responsibility |
| --- | --- |
| `USERS_ROLES_VIEW` | Read role management records |
| `USERS_ROLES_CREATE` | Create custom roles |
| `USERS_ROLES_UPDATE` | Change role names/permissions |
| `USERS_ROLES_ASSIGN` | Assign, replace or detach a user's linked role |

The backend chooses stable, unused bit positions and publishes them in the catalog. User creation still requires `USERS_CREATE`; assignment changes require `USERS_PERMISSIONS_MANAGE` as well as `USERS_ROLES_ASSIGN`. Editing exceptions on an unchanged role requires `USERS_PERMISSIONS_MANAGE`, not unrestricted role administration.

## Role endpoints

| Endpoint | Payload / result |
| --- | --- |
| `GET /roles` | `branchId`, `page`, `pageSize`, optional `search`, optional `assignableOnly`; returns a paginated Role collection |
| `GET /roles/{id}` | Returns one authorized Role |
| `POST /roles` | `{ name, branchId, permissions }`; returns the created Role |
| `PUT /roles/{id}` | `{ name, branchId, permissions, rowVersion }`; returns the updated Role |

Role: `{ id, name, branchId, permissions, rowVersion }`. IDs are positive safe JSON integers. `name` is trimmed, nonempty and at most 200 characters. Version tokens are opaque nonempty strings. Role collections include their permission masks and versions so the assignment picker can validate/display a bounded page without loading every role. `pageSize` is at most 100; the UI uses 20. An empty role may be defined; assigning it does not manufacture grants.

`assignableOnly=true` requires `USERS_ROLES_ASSIGN`; normal role management reads require `USERS_ROLES_VIEW`. The server filters assignable roles and enforces delegation limits. Branch IDs are validated against authenticated scope and cannot be used as an authorization claim. Role deletion was not requested and is not implemented.

## User creation

The adopted direct-permission body is unchanged:

```json
{ "fullName": "Example", "username": "example", "password": "example-only", "branchId": 1, "permissions": [{ "moduleCode": "USERS", "mask": "1" }] }
```

The role variant uses the same `POST /users` route and sends a role reference, not copied role permissions:

```json
{
  "fullName": "Example", "username": "example", "password": "example-only", "branchId": 1,
  "roleId": 7, "roleVersion": "opaque-role-version",
  "additionalPermissions": [], "excludedPermissions": []
}
```

The backend must accept exactly one source, validate the referenced role/version, scope and effective delegation in the same transaction, and preserve the role relationship. It must not store role-derived masks as an independent direct assignment. The existing create response remains `{ id, fullName, username, branchId, branchName, isActive, createdAtUtc, rowVersion }`.

## Read and change a user's authorization

New resource: `GET /users/{id}/authorization` returns:

```json
{
  "userId": 9, "branchId": 1,
  "permissions": [{ "moduleCode": "USERS", "mask": "1" }],
  "permissionsVersion": "opaque-user-authorization-version",
  "assignment": {
    "mode": "role",
    "role": { "id": 7, "name": "Custom role", "branchId": 1, "permissions": [{ "moduleCode": "USERS", "mask": "3" }], "rowVersion": "opaque-role-version" },
    "additionalPermissions": [],
    "excludedPermissions": [{ "moduleCode": "USERS", "mask": "2" }]
  }
}
```

For direct users, `assignment` is `{ mode: "direct", permissions: [...] }`. The top-level `permissions` are the server-resolved effective masks. A v2 response must include explicit assignment metadata and matching user/branch identity; missing metadata is not interpreted as a direct assignment.

`PUT /users/{id}/authorization` accepts `{ permissionsVersion, assignment }`, where assignment is either:

- `{ mode: "direct", permissions: [...] }`;
- `{ mode: "role", roleId, roleVersion, additionalPermissions, excludedPermissions }`.

It returns the updated authorization resource. The server enforces branch/user identity, delegation and both version tokens. The client captures the original user authorization version when editing starts, so a later background refetch cannot silently replace the concurrency token for an unsaved draft. A conflict retains the draft and requires explicit reload/cancellation.

When Roles capability is false, the UI keeps using the adopted `GET/PUT /users/{id}/permissions` contract. A v2 failure never triggers a fallback write to the legacy resource. Account-name editing still requires the existing user-detail RowVersion contract and remains blocked if that token is absent.

## Server requirements and acceptance

- Check every read/write operation on the server, including assignable lookups; deny unknown operation codes and cross-branch records.
- Validate uint64 masks, unique module entries, known catalog bits, non-conflicting overrides, role membership and delegation. A permission unavailable to the actor must not be newly granted or restored through inheritance.
- Preserve exception vectors separately from shared role definitions. Resolve effective access on role changes and invalidate affected users' authorization/session permission versions atomically.
- Reject stale user or role versions with HTTP 409 and stable code `CONCURRENCY_CONFLICT`. Do not overwrite concurrent changes or silently replace the user's selected role.
- Record role and assignment changes in the server audit log. Enforce normal cookie/origin/CSRF and session controls.
- Verify changes against a real backend before production activation. Frontend contract and Chromium fixture tests are not evidence of deployed server authorization.

## Legacy client safety

Once a user has a role assignment, the server must reject legacy `/users/{id}/permissions` writes rather than flattening that assignment into a direct mask. New clients do not fall back to the legacy write endpoint after a versioned authorization failure.
