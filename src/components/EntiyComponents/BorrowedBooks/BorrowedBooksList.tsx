import React, { useEffect, useState } from 'react';
import { BorrowedBook } from '../../../services/types';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';

const BorrowedBooksList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    userName: false,
    bookTitle: false,
    borrowedDate: false,
    returnDate: false,
    returnedOn: false,
    status: false,
  });

  const [filters, setFilters] = useState<Record<string, any>>({
    userName: '',
    bookTitle: '',
    borrowedDate: '',
    returnDate: '',
    returnedOn: '',
    status: '',
  });

  const fetchBorrowedBooks = async () => {
    const data = await getBorrowedBooks();
    console.log('Fetched Borrowed Books:', data);
    setBorrowedBooks(data);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const columns: Column<BorrowedBook>[] = [
    {
      key: 'userName',
      label: 'User Name',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.userDetails?.name ?? '',
      filterFn: (item, value) =>
        item.userDetails?.name?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'bookTitle',
      label: 'Book Title',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.bookDetails?.title ?? '',
      filterFn: (item, value) =>
        item.bookDetails?.title?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'borrowedDate',
      label: 'Borrowed Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.borrowedDate
          ? new Date(item.borrowedDate).toLocaleDateString()
          : 'N/A',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.borrowedDate ?? 0);
        if (isNaN(itemDate.getTime())) return false;
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }
        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'returnDate',
      label: 'Return Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.returnDate
          ? new Date(item.returnDate).toLocaleDateString()
          : 'N/A',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.returnDate ?? 0);
        if (isNaN(itemDate.getTime())) return false;
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }
        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'returnedOn',
      label: 'Returned On',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.returnedOn
          ? new Date(item.returnedOn).toLocaleDateString()
          : 'Not Returned',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.returnedOn ?? 0);
        if (isNaN(itemDate.getTime())) return false;
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }
        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      includeFilter: true,
      includeSort: true,
      options: ['BORROWED', 'RETURNED', 'OVERDUE', 'CANCELED'],
      getValue: (item) => item.status,
      filterFn: (item, value) =>
        value === '' || item.status.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'totalCost',
      label: 'Total Cost',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => `$${item.totalCost}`,
    },
  ];

  return (
    <EntityTable
      heading="Borrowed Books"
      data={borrowedBooks}
      columns={columns}
      filters={filters}
      setFilters={setFilters}
      showFilterInput={showFilterInput}
      setShowFilterInput={setShowFilterInput}
      initialSortConfig={{ sortBy: 'borrowedDate', direction: 'desc' }}
    />
  );
};

export default BorrowedBooksList;
