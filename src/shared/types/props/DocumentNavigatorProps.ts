export interface DocumentNavigatorProps {
  index: number;
  count: number;
  onChange: (i: number) => void;
  onList?: () => void;
  isDisabled?: boolean;
}
