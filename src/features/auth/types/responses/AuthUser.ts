export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff' | 'viewer';
  active: number;
  must_change: number;
  created_at: number;
}
