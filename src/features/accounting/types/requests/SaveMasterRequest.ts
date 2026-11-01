export type SaveMasterRequest = {
  collection:
    | 'units'
    | 'categories'
    | 'groups'
    | 'productGroups'
    | 'expenseTypes'
    | 'accounts'
    | 'cash'
    | 'assets'
    | 'contacts'
    | 'users';
  record: {
    id?: string;
    name: string;
    active: boolean;
  };
};
