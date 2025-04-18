import React, { useEffect, useState } from 'react';
import { BorrowedBook } from '../../../services/types';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';
import { Form } from 'react-bootstrap';
const BorrowedBooksList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [showFilterInput, setShowFilterInput] = useState({
    userName: false,
    bookTitle: false,
    BorrowedDate: false,
    returnDate: false,
    returnedOn: false,
    status: false,
  });
  const [filters, setFilters] = useState({
    userName: '',
    bookTitle: '',
    BorrowedDate: '',
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
  const toggleFilterInput = (filter: keyof typeof showFilterInput) => {
    setShowFilterInput((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const filteredBorrowedBooks = () => {
    return borrowedBooks
      .filter((b) =>
        filters.userName
          ? b.userDetails.name
              .toLowerCase()
              .includes(filters.userName.toLowerCase())
          : true
      )
      .filter((b) =>
        filters.bookTitle
          ? b.bookDetails.title
              .toLowerCase()
              .includes(filters.bookTitle.toLowerCase())
          : true
      )
      .filter((b) =>
        filters.BorrowedDate
          ? new Date(b.borrowedDate ?? 0)
              .toLocaleDateString()
              .includes(filters.BorrowedDate)
          : true
      )
      .filter((b) =>
        filters.returnDate
          ? new Date(b.returnDate ?? 0)
              .toLocaleDateString()
              .includes(filters.returnDate)
          : true
      )
      .filter((b) =>
        filters.returnedOn
          ? b.returnedOn &&
            new Date(b.returnedOn)
              .toLocaleDateString()
              .includes(filters.returnedOn)
          : true
      )
      .filter((b) =>
        filters.status
          ? b.status.toLowerCase().includes(filters.status.toLowerCase())
          : true
      );
  };
  return (
    <div className="table-container">
      <h3 className="text-center my-3">Borrowed Books</h3>
      <table className="table table-info table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>
              User Name{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('userName')}
              >
                🔍
              </span>
              {showFilterInput.userName && (
                <Form.Control
                  type="text"
                  placeholder="Search Name"
                  size="sm"
                  name="userName"
                  value={filters.userName}
                  onChange={handleFilterChange}
                ></Form.Control>
              )}
            </th>
            <th>
              Book Title{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('bookTitle')}
              >
                🔍
              </span>
              {showFilterInput.bookTitle && (
                <Form.Control
                  type="text"
                  placeholder="Search Title"
                  size="sm"
                  name="bookTitle"
                  value={filters.bookTitle}
                  onChange={handleFilterChange}
                ></Form.Control>
              )}
            </th>
            <th>
              Borrowed Date{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('BorrowedDate')}
              >
                🔍
              </span>
              {showFilterInput.BorrowedDate && (
                <Form.Control
                  type="date"
                  size="sm"
                  name="BorrowedDate"
                  value={filters.BorrowedDate}
                  onChange={handleFilterChange}
                />
              )}
            </th>
            <th>
              Return Date{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('returnDate')}
              >
                🔍
              </span>
              {showFilterInput.returnDate && (
                <Form.Control
                  type="date"
                  size="sm"
                  name="returnDate"
                  value={filters.returnDate}
                  onChange={handleFilterChange}
                />
              )}
            </th>
            <th>
              Returned On{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('returnedOn')}
              >
                🔍
              </span>
              {showFilterInput.returnedOn && (
                <>
                  <Form.Control
                    type="date"
                    size="sm"
                    name="returnedOn"
                    value={filters.returnedOn}
                    onChange={handleFilterChange}
                    placeholder=""
                  />
                </>
              )}
            </th>
            <th>
              Status{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('status')}
              >
                🔍
              </span>
              {showFilterInput.status && (
                <Form.Select
                  size="sm"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="BORROWED">Borrowed</option>
                  <option value="RETURNED">Returned</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="CANCELED">Canceled</option>
                </Form.Select>
              )}
            </th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredBorrowedBooks().map((borrowedBook, index) => (
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
