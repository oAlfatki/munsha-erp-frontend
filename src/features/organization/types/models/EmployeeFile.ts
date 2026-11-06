export interface EmployeeFile {
  id: string;
  name: string;
  type: 'application/pdf' | 'image/png' | 'image/jpeg';
  data: string;
}
