import { ROUTES } from '@/core/config/navigation-paths';
import { VoucherEditor } from '@/features/accounting/components/VoucherEditor';
import { useNavigate } from 'react-router-dom';
export default function CreatePaymentVoucherPage(){const navigate=useNavigate();return <VoucherEditor kind='payment' onClose={()=>navigate(ROUTES.ACCOUNTING)}/>;}
