import React, { useEffect, useState } from 'react';
import { BorrowedBook } from '../../../services/types';
import { getBorrowedBooks } from '../../../services/EntityServices/borrowedBookService';
import { useFilterSort } from '../../../services/useFilterSort';
import FilterToggleInput from '../../Utilities/FilterToggleInput';
import { useGlobalSearch } from '../../Utilities/GlobalSearchContext';

const BorrowedBooksList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const { globalSearch } = useGlobalSearch();
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

  const toggleFilterInput = (key: keyof typeof showFilterInput) => {
    setShowFilterInput((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const globallyFilteredData = borrowedBooks.filter((b) => {
    const search = globalSearch.toLocaleLowerCase();
    return (
      b.userDetails.name.toLowerCase().includes(search) ||
      b.bookDetails.title.toLowerCase().includes(search) ||
      (b.borrowedDate &&
        new Date(b.borrowedDate).toLocaleDateString().includes(search)) ||
      (b.returnDate &&
        new Date(b.returnDate).toLocaleDateString().includes(search)) ||
      (b.returnedOn &&
        new Date(b.returnedOn).toLocaleDateString().includes(search)) ||
      b.status.toLowerCase().includes(search)
    );
  });
  const { sortedData, handleSort, sortConfig } = useFilterSort(
    borrowedBooks,
    filters,
    setFilters,
    {
      userName: (b, value) =>
        b.userDetails?.name?.toLowerCase().includes(value.toLowerCase()),
      bookTitle: (b, value) =>
        b.bookDetails?.title?.toLowerCase().includes(value.toLowerCase()),
      borrowedDate: (b, value) =>
        new Date(b.borrowedDate ?? 0).toLocaleDateString().includes(value),
      returnDate: (b, value) =>
        new Date(b.returnDate ?? 0).toLocaleDateString().includes(value),
      returnedOn: (b, value) =>
        new Date(b.returnedOn ?? 0).toLocaleDateString().includes(value),
      status: (r, value) =>
        r.status.toLowerCase().includes(value.toLowerCase()),
    },
    {
      userName: (b) => b.userDetails.name,
      bookTitle: (b) => b.bookDetails.title,
      borrowedDate: (b) => b.borrowedDate,
      returnDate: (b) => b.returnDate,
      returnedOn: (b) => b.returnedOn,
      status: (b) => b.status,
    }
  );

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.sortBy !== column) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️';
  };

  return (
    <div className="table-container">
      <h3 className="text-center my-3">Borrowed Books</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search anything..."
        value={globalSearch}
        // onChange={(e) => setGlobalSearch(e.target.value)}
      />
      <table className="table table-info table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                handleSort('userName');
              }}
            >
              User Name{getSortIcon('userName')}
              <FilterToggleInput
                show={showFilterInput.userName}
                type={'text'}
                value={filters.userName}
                name={'userName'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('userName')}
                placeHolder="Search User Name"
              />
            </th>
            <th
              onClick={() => handleSort('bookTitle')}
              style={{ cursor: 'pointer' }}
            >
              Book Title{getSortIcon('bookTitle')}
              <FilterToggleInput
                show={showFilterInput.bookTitle}
                type={'text'}
                value={filters.bookTitle}
                name={'bookTitle'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('bookTitle')}
                placeHolder="Search Book Titile"
              />
            </th>
            <th
              onClick={() => handleSort('borrowedDate')}
              style={{ cursor: 'pointer' }}
            >
              Borrowed Date{getSortIcon('borrowedDate')}
              <FilterToggleInput
                show={showFilterInput.borrowedDate}
                type={'date'}
                value={filters.borrowedDate}
                name={'borrowedDate'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('borrowedDate')}
              />
            </th>
            <th
              onClick={() => handleSort('returnDate')}
              style={{ cursor: 'pointer' }}
            >
              Return Date{getSortIcon('returnDate')}
              <FilterToggleInput
                show={showFilterInput.returnDate}
                type={'date'}
                value={filters.returnDate}
                name={'returnDate'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('returnDate')}
              />
            </th>

            <th
              onClick={() => handleSort('returnedOn')}
              style={{ cursor: 'pointer' }}
            >
              Returned On{getSortIcon('returnedOn')}
              <FilterToggleInput
                show={showFilterInput.returnedOn}
                type={'date'}
                value={filters.returnedOn}
                name={'returnedOn'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('returnedOn')}
              />
            </th>
            <th
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer' }}
            >
              Status{getSortIcon('status')}
              <FilterToggleInput
                show={showFilterInput.status}
                type={'select'}
                value={filters.status}
                name={'status'}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('status')}
                options={['BORROWED', 'RETURNED', 'OVERDUE', 'CANCELED']}
              />
            </th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((borrowedBook, index) => (
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
