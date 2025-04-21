import { useParams, useLocation } from 'react-router-dom';
import { getBorrowedBooksForUserWithId } from '../../../services/EntityServices/userService';
import BorrowedBooksTable from '../BorrowedBooks/BorrowedBooksTable';

const UserBorrowedBooks = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const userName = location.state?.userName;
  const fetchBooks = () => getBorrowedBooksForUserWithId(id);

  return (
    <BorrowedBooksTable
      heading={`Books Borrowed by ${userName}`}
      dataFetcher={fetchBooks}
      includeUserColumn={false}
    />
  );
};

export default UserBorrowedBooks;
