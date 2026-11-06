export interface ToggleProps {
  label: string;
  isChecked: boolean;
  onChange: (isV: boolean) => void;
  note?: string;
}
