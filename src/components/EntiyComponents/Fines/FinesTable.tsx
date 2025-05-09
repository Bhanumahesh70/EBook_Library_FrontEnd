import React, { useEffect, useState } from 'react';
import EntityTable from '../AbstractEntity/EntityTable';
import { Fine, Column } from '../../../services/types';

interface Props {
  heading: string;
  dataFetcher: () => Promise<Fine[]>;
}

const FinesTable: React.FC<Props> = ({ heading, dataFetcher }) => {
  const [fines, setFines] = useState<Fine[]>([]);
  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    dataFetcher().then((data) => {
      console.log(`${heading} Data:`, data);
      setFines(data);
    });
  }, [dataFetcher]);

  const columns: Column<Fine>[] = [
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
      getValue: (item) => item.borrowedBookDetails?.bookDetails?.title ?? '',
      filterFn: (item, value) =>
        item.borrowedBookDetails?.bookDetails?.title
          ?.toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      key: 'borrowedDate',
      label: 'Borrowed Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.borrowedBookDetails?.borrowedDate
          ? new Date(item.borrowedBookDetails.borrowedDate).toLocaleDateString()
          : 'N/A',
      filterFn: (item, value) => {
        const date = item.borrowedBookDetails?.borrowedDate;
        return date && new Date(date).toLocaleDateString().includes(value);
      },
    },
    {
      key: 'amount',
      label: 'Fine Amount',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => `$${item.amount}`,
      filterFn: (item, value) =>
        item.amount?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      includeFilter: true,
      includeSort: true,
      options: ['PAID', 'UNPAID'],
      getValue: (item) => item.status,
      filterFn: (item, value) =>
        value === '' || item.status.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'paidDate',
      label: 'Paid Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.paidDate
          ? new Date(item.paidDate).toLocaleDateString()
          : 'Not Paid',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.paidDate ?? 0);
        return itemDate.toLocaleDateString().includes(value);
      },
    },
  ];

  return (
    <div className="table-section">
      <EntityTable
        heading={heading}
        data={fines}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
        initialSortConfig={{ sortBy: 'borrowedDate', direction: 'desc' }}
      />
    </div>
  );
};

export default FinesTable;
