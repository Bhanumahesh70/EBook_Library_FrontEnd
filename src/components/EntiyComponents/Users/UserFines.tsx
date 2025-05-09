import { useParams, useLocation } from 'react-router-dom';
import { getFinesForUserWithId } from '../../../services/EntityServices/userService';
import FinesTable from '../Fines/FinesTable';

const UserFines = () => {
  const { id } = useParams<{ id: string }>();
  const fetchFines = () => getFinesForUserWithId(id);

  return <FinesTable heading={`Fines`} dataFetcher={fetchFines} />;
};

export default UserFines;
