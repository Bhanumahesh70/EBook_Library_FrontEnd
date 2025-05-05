import { getFines } from '../../../services/EntityServices/fineService';
import FinesTable from './FinesTable';

const FinesList = () => {
  return <FinesTable heading="All Fines" dataFetcher={getFines} />;
};

export default FinesList;
