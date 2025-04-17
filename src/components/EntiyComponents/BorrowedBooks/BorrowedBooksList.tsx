import React, { useEffect, useState } from 'react';
import { BorrowedBook } from '../../../services/types';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';

const BorrowedBooksList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  const fetchBorrowedBooks = async () => {
    const data = await getBorrowedBooks();
    console.log('Fetched Borrowed Books:', data);
    setBorrowedBooks(data);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return (
    <div className="table-container">
      <h3 className="text-center my-3">Borrowed Books</h3>
      <table className="table table-info table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Book Title</th>
            <th>Borrowed Date</th>
            <th>Return Date</th>
            <th>Returned On</th>
            <th>Status</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((borrowedBook, index) => (
            <tr key={borrowedBook.id}>
              <td>{index + 1}</td>
              <td>{borrowedBook.userDetails.name}</td>
              <td>{borrowedBook.bookDetails.title}</td>
              <td>
                {borrowedBook.borrowedDate
                  ? new Date(borrowedBook.borrowedDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                {borrowedBook.returnDate
                  ? new Date(borrowedBook.returnDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                {borrowedBook.returnedOn
                  ? new Date(borrowedBook.returnedOn).toLocaleDateString()
                  : 'Not Returned'}
              </td>
              <td>{borrowedBook.status}</td>
              <td>${borrowedBook.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooksList;
