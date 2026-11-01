export type PermissionResponse = {
  role: 'admin' | 'staff' | 'viewer';
  modules: Array<string>;
  actions: Array<string>;
  authoritative: true;
};
