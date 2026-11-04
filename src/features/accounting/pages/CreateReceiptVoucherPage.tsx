import { Accounting } from '@/features/accounting/components/Accounting';
import { VoucherEditor } from '@/features/accounting/components/VoucherEditor';
import { useState } from 'react';
export default function CreateReceiptVoucherPage() {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <Accounting />
      {isOpen && <VoucherEditor kind="receipt" onClose={() => setOpen(false)} />}
    </>
  );
}
