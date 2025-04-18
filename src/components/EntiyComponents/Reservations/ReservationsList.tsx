import React from 'react';
import {
  getReservations,
  updateReservation,
} from '../../../services/EntityServices/reservationService';
import { Reservation } from '../../../services/types';
import { Form, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
const ReservationsList = () => {
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const fetchReservations = async () => {
    const reservationsData = await getReservations();
    console.log('Reservation data is fetched: ', reservationsData);
    setReservations(reservationsData);
  };
  React.useEffect(() => {
    fetchReservations();
  }, []);

  const [filters, setFilters] = React.useState({
    userName: '',
    bookTitle: '',
    reservationDate: '',
    status: '',
  });

  const [showFilters, setShowFilters] = React.useState({
    userName: false,
    bookTitle: false,
    reservationDate: false,
    status: false,
  });
  const statusLabels: Record<string, String> = {
    REQUESTED: 'Select',
    APPROVED: 'Approve',
    REJECTED: 'Reject',
  };
  const nextStatusOptions: Record<string, string[]> = {
    REQUESTED: ['REQUESTED', 'APPROVED', 'REJECTED'],
    APPROVED: ['APPROVED'],
    REJECTED: ['REJECTED'],
  };
  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFilterInput = (filter: keyof typeof showFilters) => {
    setShowFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  const filteredReservations = reservations
    .filter((r) =>
      filters.status
        ? r.status.toLowerCase().includes(filters.status.toLowerCase())
        : true
    )
    .filter((r) =>
      filters.userName
        ? r.userDetails.name
            .toLowerCase()
            .includes(filters.userName.toLowerCase())
        : true
    )
    .filter((r) =>
      filters.bookTitle
        ? r.bookDetails.title
            .toLowerCase()
            .includes(filters.bookTitle.toLowerCase())
        : true
    )
    .filter((r) =>
      filters.reservationDate
        ? new Date(r.reservationDate ?? 0)
            .toLocaleDateString()
            .includes(filters.reservationDate)
        : true
    );
  const handleStatusChange = async (
    reservation: Reservation,
    newStatus: string
  ) => {
    // newStatus = newStatus === 'Approve' ? 'APPROVED' : 'REJECTED';
    reservation.status = newStatus;
    const updatedReservation = await updateReservation(
      reservation.id,
      reservation
    );
    if (updatedReservation) {
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservation.id ? { ...res, status: newStatus } : res
        )
      );
    }
  };
  return (
    <div className="table-container">
      <h3 className="text-center my-3">Book Reservations</h3>
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th>
              User Name{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('userName')}
              >
                🔍
              </span>
              {showFilters.userName && (
                <Form.Control
                  type="text"
                  name="userName"
                  size="sm"
                  className="mt-1"
                  placeholder="Search name"
                  value={filters.userName}
                  onChange={handleFilterChange}
                />
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
              {showFilters.bookTitle && (
                <Form.Control
                  type="text"
                  name="bookTitle"
                  size="sm"
                  className="mt-1"
                  placeholder="Search title"
                  value={filters.bookTitle}
                  onChange={handleFilterChange}
                />
              )}
            </th>
            <th>
              Reservation Date{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('reservationDate')}
              >
                🔍
              </span>
              {showFilters.reservationDate && (
                <Form.Control
                  type="date"
                  name="reservationDate"
                  size="sm"
                  className="mt-1"
                  placeholder="MM/DD/YYYY"
                  value={filters.reservationDate}
                  onChange={handleFilterChange}
                />
              )}
            </th>
            <th>Number of Days</th>
            <th>
              Status{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFilterInput('status')}
              >
                🔍
              </span>
              {showFilters.status && (
                <Form.Select
                  name="status"
                  size="sm"
                  className="mt-1"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="REQUESTED">Requested</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CANCELED">Canceled</option>
                </Form.Select>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={reservation.id}>
              <th scope="row">{index + 1}</th>
              <td>{reservation.userDetails.name}</td>
              <td>{reservation.bookDetails.title}</td>
              <td>
                {' '}
                {reservation.reservationDate
                  ? new Date(reservation.reservationDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>{reservation.numberOfDays}</td>

              <td className="cardButtonsContainer">
                {reservation.status}
                {reservation.status === 'REQUESTED' ? (
                  <Form.Select
                    value={reservation.status}
                    onChange={(e) =>
                      handleStatusChange(reservation, e.target.value)
                    }
                  >
                    {nextStatusOptions[reservation.status].map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="DropDownListItems "
                      >
                        {statusLabels[status] || status}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <></>
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
