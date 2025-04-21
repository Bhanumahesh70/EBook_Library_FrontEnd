import React, { useEffect, useState } from 'react';
import { Reservation } from '../services/types';
import {
  getReservations,
  updateReservation,
} from '../services/EntityServices/reservationService';
import { useFilterSort } from '../services/useFilterSort';
import FilterToggleInput from '../components/Utilities/FilterToggleInput';
import { useGlobalSearch } from '../components/Utilities/GlobalSearchContext';

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { globalSearch } = useGlobalSearch();

  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    userName: false,
    bookTitle: false,
    reservationDate: false,
    status: false,
  });

  const [filters, setFilters] = useState<Record<string, any>>({
    userName: '',
    bookTitle: '',
    reservationDate: '',
    status: '',
  });

  const fetchReservations = async () => {
    const data = await getReservations();
    console.log('Fetched Reservations:', data);
    setReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const toggleFilterInput = (key: keyof typeof showFilterInput) => {
    setShowFilterInput((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const globallyFilteredData = reservations.filter((r) => {
    const search = globalSearch.toLowerCase();
    return (
      r.userDetails.name.toLowerCase().includes(search) ||
      r.bookDetails.title.toLowerCase().includes(search) ||
      (r.reservationDate &&
        new Date(r.reservationDate).toLocaleDateString().includes(search)) ||
      r.status.toLowerCase().includes(search)
    );
  });

  const { sortedData, handleSort, sortConfig } = useFilterSort(
    globallyFilteredData,
    filters,
    setFilters,
    {
      userName: (r) =>
        r.userDetails.name
          .toLowerCase()
          .includes(filters.userName.toLowerCase()),
      bookTitle: (r) =>
        r.bookDetails.title
          .toLowerCase()
          .includes(filters.bookTitle.toLowerCase()),
      reservationDate: (r) =>
        new Date(r.reservationDate ?? 0)
          .toLocaleDateString()
          .includes(filters.reservationDate),
      status: (r) =>
        r.status.toLowerCase().includes(filters.status.toLowerCase()),
    },
    {
      userName: (r) => r.userDetails.name,
      bookTitle: (r) => r.bookDetails.title,
      reservationDate: (r) => r.reservationDate,
      status: (r) => r.status,
    }
  );

  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.sortBy !== column) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️';
  };

  const statusLabels: Record<string, string> = {
    REQUESTED: 'Select',
    APPROVED: 'Approve',
    REJECTED: 'Reject',
  };

  const nextStatusOptions: Record<string, string[]> = {
    REQUESTED: ['REQUESTED', 'APPROVED', 'REJECTED'],
    APPROVED: ['APPROVED'],
    REJECTED: ['REJECTED'],
  };

  const handleStatusChange = async (
    reservation: Reservation,
    newStatus: string
  ) => {
    reservation.status = newStatus;
    const updated = await updateReservation(reservation.id, reservation);
    if (updated) {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservation.id ? { ...r, status: newStatus } : r
        )
      );
    }
  };

  return (
    <div className="table-container">
      <h3 className="text-center my-3">Book Reservations</h3>
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
              onClick={() => handleSort('userName')}
              style={{ cursor: 'pointer' }}
            >
              User Name{getSortIcon('userName')}
              <FilterToggleInput
                show={showFilterInput.userName}
                type="text"
                name="userName"
                value={filters.userName}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('userName')}
                placeHolder="Search User"
              />
            </th>
            <th
              onClick={() => handleSort('bookTitle')}
              style={{ cursor: 'pointer' }}
            >
              Book Title{getSortIcon('bookTitle')}
              <FilterToggleInput
                show={showFilterInput.bookTitle}
                type="text"
                name="bookTitle"
                value={filters.bookTitle}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('bookTitle')}
                placeHolder="Search Title"
              />
            </th>
            <th
              onClick={() => handleSort('reservationDate')}
              style={{ cursor: 'pointer' }}
            >
              Reservation Date{getSortIcon('reservationDate')}
              <FilterToggleInput
                show={showFilterInput.reservationDate}
                type="date"
                name="reservationDate"
                value={filters.reservationDate}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('reservationDate')}
              />
            </th>
            <th>Number of Days</th>
            <th
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer' }}
            >
              Status{getSortIcon('status')}
              <FilterToggleInput
                show={showFilterInput.status}
                type="select"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                onToggle={() => toggleFilterInput('status')}
                options={[
                  'REQUESTED',
                  'APPROVED',
                  'REJECTED',
                  'ACTIVE',
                  'CANCELED',
                ]}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((reservation, index) => (
            <tr key={reservation.id}>
              <td>{index + 1}</td>
              <td>{reservation.userDetails.name}</td>
              <td>{reservation.bookDetails.title}</td>
              <td>
                {reservation.reservationDate
                  ? new Date(reservation.reservationDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>{reservation.numberOfDays}</td>
              <td className="cardButtonsContainer">
                {reservation.status}
                {reservation.status === 'REQUESTED' && (
                  <select
                    value={reservation.status}
                    onChange={(e) =>
                      handleStatusChange(reservation, e.target.value)
                    }
                    className="form-select form-select-sm mt-1"
                  >
                    {nextStatusOptions[reservation.status].map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status] || status}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
