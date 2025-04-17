import React from 'react';
import { Reservation } from '../../../services/types';
import { getReservationsForUserWithId } from '../../../services/EntityServices/userService';
import { updateReservation } from '../../../services/EntityServices/reservationService';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
const UserReservations = () => {
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const { id } = useParams<{ id: string }>();

  const fetchReservations = async () => {
    const reservationsData = await getReservationsForUserWithId(id);
    console.log('User Reservations: ', reservationsData);
    setReservations(reservationsData);
  };

  React.useEffect(() => {
    fetchReservations();
  }, []);
  const handleReservationCancel = (reservation: Reservation) => {
    reservation.status = 'CANCELED';
    updateReservation(reservation.id, reservation);
    console.log('reservation is updated sucessfully', reservation);
    setReservations((prev) =>
      prev.map((r) => (r.id === reservation.id ? (r = reservation) : r))
    );
  };
  return (
    <div className="table-container ">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Number of Days</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations
            .sort(
              (a, b) =>
                new Date(b.reservationDate ?? 0).getTime() -
                new Date(a.reservationDate ?? 0).getTime()
            )
            .map((reservation, index) => (
              <tr key={reservation.id}>
                <th scope="row">{index + 1}</th>
                <td>{reservation.bookDetails.title}</td>
                <td>
                  {reservation.reservationDate
                    ? new Date(reservation.reservationDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>{reservation.numberOfDays}</td>
                <td className="list_flex_items">
                  {reservation.status}
                  {reservation.status === 'REQUESTED' ? (
                    <Button
                      variant="outline-primary"
                      onClick={() => handleReservationCancel(reservation)}
                    >
                      Cancel
                    </Button>
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

export default UserReservations;
