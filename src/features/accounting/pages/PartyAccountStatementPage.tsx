import { Accounting } from '@/features/accounting/components/Accounting';
import { useParams } from 'react-router-dom';
export default function PartyAccountStatementPage() {
  const { partyId = '' } = useParams();
  return <Accounting initialTab="statement" initialPartyId={partyId} />;
}
