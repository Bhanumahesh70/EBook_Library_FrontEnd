import React from 'react';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';
import BorrowedBooksTable from './BorrowedBooksTable';

const BorrowedBooksList = () => {
  return (
    <BorrowedBooksTable
      heading="All Borrowed Books"
      dataFetcher={getBorrowedBooks}
      includeUserColumn={true}
    />
  );
};

export default BorrowedBooksList;
