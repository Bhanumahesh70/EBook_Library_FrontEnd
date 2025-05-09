import React from 'react';
import { getAuthors } from '../../../services/EntityServices/authorService';
import { useNavigate, Link } from 'react-router-dom';
import { Author } from '../../../services/types';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';

const AuthorsList = () => {
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const navigate = useNavigate();
  const [showFilterInput, setShowFilterInput] = React.useState<
    Record<string, boolean>
  >({
    name: false,
    nationality: false,
    birthDate: false,
  });

  const [filters, setFilters] = React.useState<Record<string, any>>({
    name: '',
    nationality: '',
    birthDate: '',
  });

  React.useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);
  function handleClick(id: string) {
    console.log('Navigating to edit author with id:', id);
    navigate(`/ebook/authors/${id}`);
  }
  const toLocalYMDFromDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const toLocalYMD = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // Note: month is 0-indexed
  };
  const columns: Column<Author>[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Author) => item.name ?? '',
      filterFn: (item, value) =>
        item.name?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'nationality',
      label: 'Nationality',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Author) => item.nationality ?? '',
      filterFn: (item, value) =>
        item.nationality?.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'birthDate',
      label: 'Birth Date',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item: Author) =>
        item.birthDate ? new Date(item.birthDate).toLocaleDateString() : 'N/A',
      filterFn: (item, value) => {
        if (!value) return true;

        const itemDate = new Date(item.birthDate);
        if (isNaN(itemDate.getTime())) return false;

        // If input is partial digits (year or partial year)
        if (/^\d{1,4}$/.test(value)) {
          return itemDate.getFullYear().toString().includes(value);
        }

        return itemDate.toLocaleDateString().includes(value);
      },
    },
    {
      key: 'books',
      label: 'Books',
      type: 'text',
      getValue: (item: Author) => 'Books',
      render: (item: Author) => (
        <Link
          to={`${item.id}/books`}
          state={{ authorName: item?.name }}
          className="btn btn-outline-primary"
        >
          Books
        </Link>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      type: 'text',
      getValue: (item: Author) => 'details',
      render: (item: Author) => (
        <Link to={`${item.id}/details`} className="btn btn-outline-primary">
          view
        </Link>
      ),
    },
  ];
  return (
    <div className="table-section">
      <EntityTable
        heading="Authors "
        data={authors}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        showFilterInput={showFilterInput}
        setShowFilterInput={setShowFilterInput}
      />
    </div>
  );
};

export default AuthorsList;
