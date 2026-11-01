export interface DeviceSettings {
  pageSize: number;
  paper: 'A4' | 'thermal';
  logo: boolean;
  address: boolean;
  words: boolean;
  footer: string;
}
