export interface MenuItem {
  id: string;
  label: string;
  target?: string;
  children?: MenuItem[];
}
