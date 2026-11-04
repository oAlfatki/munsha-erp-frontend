export interface AuthActionResponse {
  ok: boolean;
  mustChange?: boolean;
  relogin?: boolean;
}
