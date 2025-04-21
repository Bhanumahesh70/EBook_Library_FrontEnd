import React, { useEffect, useState } from 'react';
import { Reservation } from '../../../services/types';
import {
  getReservations,
  updateReservation,
} from '../../../services/EntityServices/reservationService';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

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

  const fetchReservations = async () => {
    const data = await getReservations();
    console.log('Fetched Reservations:', data);
    setReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
  const columns: Column<Reservation>[] = [
    {
      key: 'username',
      label: 'Username',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Reservation) => item.userDetails?.name ?? '',
      filterFn: (item, value) =>
        item.userDetails?.name?.toLowerCase().includes(value.toLowerCase()),
    },
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

        // If input is partial digits (year or partial year)
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }

        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'numberOfDays',
      label: 'Number of Days Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
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
      filterFn: (item: Reservation, value: string) =>
        value === '' || item.status === value,
      render: (item: Reservation) =>
        item.status === 'REQUESTED' ? (
          <>
            {item.status}
            <select
              value={item.status}
              onChange={(e) => handleStatusChange(item, e.target.value)}
              className="form-select form-select-sm mt-1"
            >
              {nextStatusOptions[item.status].map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status] || status}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>{item.status}</>
        ),
    },
  ];
  return (
    <>
      <EntityTable
        heading="Reservations "
        data={reservations}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
        initialSortConfig={{ sortBy: 'reservationDate', direction: 'desc' }}
      />
    </>
  );
};

export default ReservationsList;
