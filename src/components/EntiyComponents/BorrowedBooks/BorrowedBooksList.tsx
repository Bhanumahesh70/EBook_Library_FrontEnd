import React from 'react';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';
import BorrowedBooksTable from './BorrowedBooksTable';

const BorrowedBooksList = () => {
  return (
    <div className="table-section">
      <BorrowedBooksTable
        heading="All Borrowed Books"
        dataFetcher={getBorrowedBooks}
        includeUserColumn={true}
      />
    </div>
  );
};

export default BorrowedBooksList;
