import { ROUTES } from '@/core/config/navigation-paths';
import { VoucherEditor } from '@/features/accounting/components/VoucherEditor';
import { useNavigate } from 'react-router-dom';
export default function CreateReceiptVoucherPage(){const navigate=useNavigate();return <VoucherEditor kind='receipt' onClose={()=>navigate(ROUTES.ACCOUNTING)}/>;}
