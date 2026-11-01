export interface VoucherEditorProps {
  kind: 'receipt' | 'payment';
  partyId?: string;
  onClose: () => void;
}
