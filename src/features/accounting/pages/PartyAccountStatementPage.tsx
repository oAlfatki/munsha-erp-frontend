import { AccountStatement } from '@/features/accounting/components/Statement';
import { useParams } from 'react-router-dom';
export default function PartyAccountStatementPage(){const {partyId=''}=useParams();return <AccountStatement initialPartyId={partyId}/>;}
