export type UserResponse = {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff' | 'viewer';
  active: 0 | 1;
  must_change: 0 | 1;
  created_at: number;
};
