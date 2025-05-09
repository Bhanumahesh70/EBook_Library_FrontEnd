import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../services/EntityServices/userService';
import { useNavigate, Link } from 'react-router-dom';
import { User, Column } from '../../../services/types';
import EntityTable from '../AbstractEntity/EntityTable';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
    role: false,
  });

  const [filters, setFilters] = useState<Record<string, any>>({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
  });

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const displayUserRole = (role: string) => {
    switch (role) {
      case 'ROLE_USER':
        return 'USER';
      case 'ROLE_LIBRARIAN':
        return 'LIBRARIAN';
      case 'ROLE_ADMIN':
        return 'ADMIN';
      default:
        return role;
    }
  };

  const columns: Column<User>[] = [
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
      key: 'email',
      label: 'Email',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.email ?? '',
      filterFn: (item, value) =>
        item.email?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.phoneNumber ?? '',
      filterFn: (item, value) =>
        item.phoneNumber?.toLowerCase().includes(value.toLowerCase()),
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
      key: 'role',
      label: 'Role',
      type: 'select',
      includeFilter: true,
      includeSort: true,
      options: ['USER', 'LIBRARIAN', 'ADMIN'],
      getValue: (item) => displayUserRole(item.role),
      filterFn: (item, value) =>
        displayUserRole(item.role).toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'books',
      label: 'Borrowed Books',
      type: 'text',
      getValue: () => 'Books',
      render: (item: User) => (
        <Link
          to={`${item.id}/books`}
          state={{ userName: item.name }}
          className="btn btn-outline-primary"
        >
          View
        </Link>
      ),
    },
    {
      key: 'edit',
      label: 'Edit User',
      type: 'text',
      getValue: () => 'Edit',
      render: (item: User) => (
        <Link
          to={`/ebook/users/${item.id}`}
          state={{ userName: item.name }}
          className="btn btn-outline-primary"
        >
          Edit
        </Link>
      ),
    },
  ];

  return (
    <div className="table-section">
      <EntityTable
        heading="Users "
        data={users}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
      />
    </div>
  );
};

export default UsersList;
