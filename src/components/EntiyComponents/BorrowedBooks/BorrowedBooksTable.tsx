import React, { useEffect, useState } from 'react';
import EntityTable from '../AbstractEntity/EntityTable';
import { BorrowedBook, Column } from '../../../services/types';

interface Props {
  heading: string;
  dataFetcher: () => Promise<BorrowedBook[]>;
  includeUserColumn?: boolean;
}

const BorrowedBooksTable: React.FC<Props> = ({
  heading,
  dataFetcher,
  includeUserColumn = true,
}) => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    dataFetcher().then((data) => {
      console.log(`${heading} Data:`, data);
      setBorrowedBooks(data);
    });
  }, [dataFetcher]);

  const columns: Column<BorrowedBook>[] = [];

  if (includeUserColumn) {
    columns.push({
      key: 'userName',
      label: 'User Name',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.userDetails?.name ?? '',
      filterFn: (item, value) =>
        item.userDetails?.name?.toLowerCase().includes(value.toLowerCase()),
    });

    showFilterInput['userName'] = false;
    filters['userName'] = '';
  }

  columns.push(
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
      key: 'bookBorrow',
      label: 'Borrow Cost',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => `$${item.bookBorrowCost}`,
    }
  );

  return (
    <EntityTable
      heading={heading}
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

export default BorrowedBooksTable;
