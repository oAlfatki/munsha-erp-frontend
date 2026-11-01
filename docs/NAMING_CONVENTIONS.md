# Naming conventions

- Components/pages/providers: PascalCase.tsx. Hooks: useCamelCase.ts. Other runtime files: kebab-case.ts.
- Every independent type/interface: exactly matching PascalCase.ts under types; request/response types in requests/responses. Form input types begin I.
- Module value constants: UPPER_SNAKE_CASE. Functions/parameters: camelCase. Boolean bindings: is/has/can/should; unused positional parameters may begin underscore. Callback props onAction.
- Zod bindings end Schema and contain Arabic messages. No explicit any/debugging console.log.
- Existing API object keys and DTO field contracts remain unchanged. Upstream ui primitives keep upstream naming.
- scripts/check-naming.mjs checks these conventions. ESLint checks unused imports/bindings and type-only imports. No feature routes/store/config/catalog registries.
