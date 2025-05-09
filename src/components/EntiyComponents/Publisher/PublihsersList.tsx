import React, { useEffect, useState } from 'react';
import { Publisher } from '../../../services/types';
import { getPublishers } from '../../../services/EntityServices/publisherService';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';
import { Link } from 'react-router-dom';

const PublishersList = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    name: false,
    address: false,
    email: false,
    phoneNumber: false,
  });

  const [filters, setFilters] = useState<Record<string, any>>({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    getPublishers().then((data) => setPublishers(data));
  }, []);

  const columns: Column<Publisher>[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.name ?? '',
      filterFn: (item, value) =>
        item.name?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'address',
      label: 'Address',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.address ?? '',
      filterFn: (item, value) =>
        item.address?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',

      getValue: (item) => item.email ?? '',
      filterFn: (item, value) =>
        item.email?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',

      getValue: (item) => item.phoneNumber ?? '',
      filterFn: (item, value) =>
        item.phoneNumber?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'books',
      label: 'Books',
      type: 'text',
      getValue: () => 'Books',
      render: (item) => (
        <Link
          to={`${item.id}/books`}
          state={{ publisherName: item?.name }}
          className="btn btn-outline-primary"
        >
          Book
        </Link>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      type: 'text',
      getValue: () => 'view',
      render: (item) => (
        <Link to={`${item.id}`} className="btn btn-outline-primary">
          view
        </Link>
      ),
    },
  ];

  return (
    <div className="table-section">
      <EntityTable
        heading="Publihsers "
        data={publishers}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
      />
    </div>
  );
};

export default PublishersList;
