import { useEffect, useState } from 'react';
import EntityTable from '../AbstractEntity/EntityTable';
import { BorrowedBook, Column } from '../../../services/types';
import { Button, Modal } from 'react-bootstrap';
import { returnBorrowedBook } from '../../../services/EntityServices/borrowedBookService';
import {
  payFine,
  getFineById,
} from '../../../services/EntityServices/fineService';

interface Props {
  heading: string;
  dataFetcher: () => Promise<BorrowedBook[]>;
  includeUserColumn?: boolean;
}

function BorrowedBooksTable({
  heading,
  dataFetcher,
  includeUserColumn = true,
}: Props) {
  const defaultBorrowedBook: BorrowedBook = {
    id: '',
    borrowedDate: new Date(),
    returnDate: new Date(),
    returnedOn: undefined,
    status: '',
    bookBorrowCost: '',
    userDetails: { id: '', name: '' },
    bookDetails: { id: '', title: '' },
    fineId: '',
    fineDetails: { id: '', amount: '', status: '', paidDate: new Date() },
  };
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [borrowedBook, setBorrowedBook] =
    useState<BorrowedBook>(defaultBorrowedBook);
  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);

  const fetchBorrowedBooks = async () => {
    const data = await dataFetcher();
    console.log(`Borrowed Books Data:`, data);
    setBorrowedBooks(data);
  };
  useEffect(() => {
    fetchBorrowedBooks();
  }, [dataFetcher]);

  const totalAmount = (borrowedBook: BorrowedBook) => {
    return borrowedBook.bookBorrowCost + borrowedBook.fineDetails?.amount;
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleReturnBook = (bookBorrowed: BorrowedBook) => {
    setBorrowedBook(bookBorrowed);
    setShowModal(true);
  };
  const returnBook = async (book: BorrowedBook) => {
    console.log('Returning book', book);
    await returnBorrowedBook(book);
    //const fine = await getFineById(book.fineDetails.id);
    await payFine(book.fineDetails.id);
    await fetchBorrowedBooks();
    setShowModal(false);
  };
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
      options: ['Return Book'],
      getValue: (item) =>
        item.returnedOn
          ? new Date(item.returnedOn).toLocaleDateString()
          : 'Not Returned',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.returnedOn ?? 0);
        return itemDate.toLocaleDateString().includes(value);
      },
      render: (item: BorrowedBook) =>
        item.returnedOn ? (
          <>{new Date(item.returnedOn).toLocaleDateString()}</>
        ) : (
          <>
            {' '}
            <Button onClick={() => handleReturnBook(item)}>Return</Button>
          </>
        ),
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
    },
    {
      key: 'fine',
      label: 'Fine',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) =>
        item.fineDetails?.amount ? `$${item.fineDetails.amount}` : '$0',
    }
  );

  return (
    <>
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay Total Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {borrowedBook.fineDetails?.amount ? (
            <p>
              <strong>Pay Due Amount: {totalAmount(borrowedBook)}$</strong>
            </p>
          ) : (
            <>
              <p>
                <strong>No amount is due to pay</strong>
              </p>
              <p>
                <strong>Confirm Return</strong>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => returnBook(borrowedBook)}>
            {borrowedBook.fineDetails?.amount ? 'Pay' : 'Confirm'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BorrowedBooksTable;
