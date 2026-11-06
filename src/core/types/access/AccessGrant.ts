/** Frontend authorization model, NOT a declared backend DTO. Mapping requires an approved contract. */
export interface AccessGrant {
  module: string;
  action: string;
  branchIds: string[];
}
