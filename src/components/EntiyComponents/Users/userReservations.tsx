import React, { useEffect, useState } from 'react';
import { Reservation } from '../../../services/types';
import { useParams } from 'react-router-dom';
import { getReservationsForUserWithId } from '../../../services/EntityServices/userService';
import { updateReservation } from '../../../services/EntityServices/reservationService';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';

const UserReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { id } = useParams<{ id: string }>();

  const [filters, setFilters] = useState<Record<string, any>>({
    bookTitle: '',
    reservationDate: '',
    status: '',
  });

  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    bookTitle: false,
    reservationDate: false,
    status: false,
  });

  const fetchReservations = async () => {
    if (id) {
      const data = await getReservationsForUserWithId(id);
      console.log('User Reservations:', data);
      setReservations(data);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [id]);

  const handleCancel = async (reservation: Reservation) => {
    const updatedReservation = { ...reservation, status: 'CANCELED' };
    const updated = await updateReservation(reservation.id, updatedReservation);
    if (updated) {
      setReservations((prev) =>
        prev.map((r) => (r.id === reservation.id ? updatedReservation : r))
      );
    }
  };

  const columns: Column<Reservation>[] = [
    {
      key: 'bookTitle',
      label: 'Book Title',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Reservation) => item.bookDetails.title ?? '',
      filterFn: (item, value) =>
        item.bookDetails.title.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'reservationDate',
      label: 'Reservation Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Reservation) =>
        item.reservationDate
          ? new Date(item.reservationDate).toLocaleDateString()
          : 'N/A',
      filterFn: (item, value) => {
        if (!value) return true;
        const itemDate = new Date(item.reservationDate ?? 0);
        if (isNaN(itemDate.getTime())) return false;
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }
        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'numberOfDays',
      label: 'Number of Days',
      type: 'text',

      getValue: (item: Reservation) => item.numberOfDays,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      includeFilter: true,
      includeSort: true,
      options: ['REQUESTED', 'APPROVED', 'REJECTED', 'ACTIVE', 'CANCELED'],
      getValue: (item: Reservation) => item.status,
      filterFn: (item, value) => value === '' || item.status === value,
      render: (item: Reservation) =>
        item.status === 'REQUESTED' ? (
          <>
            {item.status}{' '}
            <button
              className="btn btn-outline-primary btn-sm mt-1"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          </>
        ) : (
          item.status
        ),
    },
  ];

  return (
    <EntityTable
      heading="Your Reservations"
      data={reservations}
      columns={columns}
      filters={filters}
      setFilters={setFilters}
      showFilterInput={showFilterInput}
      setShowFilterInput={setShowFilterInput}
      initialSortConfig={{ sortBy: 'reservationDate', direction: 'desc' }}
    />
  );
};

export default UserReservations;
