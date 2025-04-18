import React from 'react';
import { BorrowedBook } from '../../../services/types';
import { getBorrowedBooksForUserWithId } from '../../../services/EntityServices/userService';
import { useParams } from 'react-router-dom';

const UserBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = React.useState<BorrowedBook[]>([]);
  const { id } = useParams<{ id: string }>();

  const fetchBooks = async () => {
    const borrowedBooksData = await getBorrowedBooksForUserWithId(id);
    console.log('BorrowedBooks: ', borrowedBooksData);
    setBorrowedBooks(borrowedBooksData);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="table-container ">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">
              Title <span>🔍</span>
            </th>
            <th scope="col">BorrowedDate</th>
            <th scope="col">ReturnDate</th>
            <th scope="col">Status</th>
            <th scope="col">ReturnedOn</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((borrowedBook, index) => (
            <tr key={borrowedBook.id}>
              <th scope="row">{index + 1}</th>
              <td data-label="Title">{borrowedBook.bookDetails.title}</td>
              <td data-label="Borrowed Date">
                {borrowedBook.borrowedDate
                  ? new Date(borrowedBook.borrowedDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td data-label="Return Date">
                {borrowedBook.returnDate
                  ? new Date(borrowedBook.returnDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td data-label="status">{borrowedBook.status}</td>
              <td data-label="Returned On">
                {borrowedBook.returnedOn
                  ? new Date(borrowedBook.returnedOn).toLocaleDateString()
                  : 'Not Returned'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBorrowedBooks;
