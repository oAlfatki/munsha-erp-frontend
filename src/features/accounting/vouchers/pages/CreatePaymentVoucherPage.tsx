import { Accounting } from '@/features/accounting/accounts/components/Accounting';
import { VoucherEditor } from '@/features/accounting/vouchers/components/VoucherEditor';
import { useState } from 'react';

export default function CreatePaymentVoucherPage() {

  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <Accounting />
      {isOpen && <VoucherEditor kind="payment" onClose={() => setOpen(false)} />}
    </>
  );
}
