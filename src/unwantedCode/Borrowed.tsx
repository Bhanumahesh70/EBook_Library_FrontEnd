import React, { useEffect, useState } from 'react';
import { BorrowedBook } from '../services/types';
import { getBorrowedBooks } from '../services/EntityServices/borrowedBookService';
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

  const [sortConfig, setSortConfig] = useState<{
    sortBy: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const toggleFilterInput = (key: keyof typeof showFilterInput) => {
    setShowFilterInput((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const sortedBorrowedBooks = () => {
    let filteredBorrowedList = filteredBorrowedBooks();

    if (sortConfig) {
      filteredBorrowedList.sort((a, b) => {
        let aValue: any;
        let bValue: any;
        switch (sortConfig.sortBy) {
          case 'userName':
            aValue = a.userDetails.name;
            bValue = b.userDetails.name;
            break;
          case 'bookTitle':
            aValue = a.bookDetails.title;
            bValue = b.bookDetails.title;
            break;
          case 'borrowedDate':
            aValue = new Date(a.borrowedDate ?? 0).getTime();
            bValue = new Date(b.borrowedDate ?? 0).getTime();
            break;
          case 'returnDate':
            aValue = new Date(a.returnDate ?? 0).getTime();
            bValue = new Date(b.returnDate ?? 0).getTime();
            break;
          case 'returnedOn':
            aValue = a.returnedOn ? new Date(a.returnedOn).getTime() : 0;
            bValue = b.returnedOn ? new Date(b.returnedOn).getTime() : 0;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'totalCost':
            aValue = a.totalCost;
            bValue = b.totalCost;
            break;
          default:
            return 0;
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filteredBorrowedList;
  };
  const handleSort = (sortBy: string) => {
    setSortConfig((prev) => {
      if (prev && prev.sortBy === sortBy) {
        return {
          sortBy,
          direction: prev?.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { sortBy, direction: 'asc' };
    });
  };
  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.sortBy !== column) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️';
  };
  return (
    <div className="table-container">
      <h3 className="text-center my-3">Borrowed Books</h3>
      <table className="table table-info table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th
              onClick={() => handleSort('userName')}
              style={{ cursor: 'pointer' }}
            >
              User Name{getSortIcon('userName')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('userName');
                }}
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
                />
              )}
            </th>
            <th
              onClick={() => handleSort('bookTitle')}
              style={{ cursor: 'pointer' }}
            >
              Book Title{getSortIcon('bookTitle')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('bookTitle');
                }}
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
                />
              )}
            </th>
            <th
              onClick={() => handleSort('borrowedDate')}
              style={{ cursor: 'pointer' }}
            >
              Borrowed Date{getSortIcon('borrowedDate')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('BorrowedDate');
                }}
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
            <th
              onClick={() => handleSort('returnDate')}
              style={{ cursor: 'pointer' }}
            >
              Return Date{getSortIcon('returnDate')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('returnDate');
                }}
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
            <th
              onClick={() => handleSort('returnedOn')}
              style={{ cursor: 'pointer' }}
            >
              Returned On{getSortIcon('returnedOn')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('returnedOn');
                }}
              >
                🔍
              </span>
              {showFilterInput.returnedOn && (
                <Form.Control
                  type="date"
                  size="sm"
                  name="returnedOn"
                  value={filters.returnedOn}
                  onChange={handleFilterChange}
                />
              )}
            </th>
            <th
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer' }}
            >
              Status{getSortIcon('status')}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilterInput('status');
                }}
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
          {sortedBorrowedBooks().map((borrowedBook, index) => (
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
