import { useParams } from 'react-router-dom';
import { getBorrowedBooksForUserWithId } from '../../../services/EntityServices/userService';
import BorrowedBooksTable from '../BorrowedBooks/BorrowedBooksTable';

const UserBorrowedBooks = () => {
  const { id } = useParams<{ id: string }>();

  const fetchBooks = () => getBorrowedBooksForUserWithId(id);

  return (
    <BorrowedBooksTable
      heading={`Books Borrowed`}
      dataFetcher={fetchBooks}
      includeUserColumn={false}
    />
  );
};

export default UserBorrowedBooks;
