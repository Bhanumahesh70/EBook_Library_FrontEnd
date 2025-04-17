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
            <th scope="col">User Name</th>
            <th scope="col">Book Title</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Number of Days</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
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
