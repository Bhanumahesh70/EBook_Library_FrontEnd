import React, { useEffect, useState } from 'react';
import { Category } from '../../../services/types';
import { getCategories } from '../../../services/EntityServices/categoryService';
import { Link } from 'react-router-dom';
import EntityTable from '../AbstractEntity/EntityTable';
import { Column } from '../../../services/types';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showFilterInput, setShowFilterInput] = useState<
    Record<string, boolean>
  >({
    categoryName: false,
    description: false,
  });

  const [filters, setFilters] = useState<Record<string, any>>({
    categoryName: '',
    description: '',
  });

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const columns: Column<Category>[] = [
    {
      key: 'categoryName',
      label: 'Name',
      type: 'text',
      includeFilter: true,
      includeSort: true,
      getValue: (item) => item.categoryName,
      filterFn: (item, value) =>
        item.categoryName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      getValue: (item) => item.description,
      filterFn: (item, value) =>
        item.description.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: 'books',
      label: 'Books',
      type: 'text',
      getValue: (item) => 'Books',
      render: (item) => (
        <Link
          to={`${item.id}/books`}
          state={{ categoryName: item?.categoryName }}
          className="btn btn-outline-primary"
        >
          Books
        </Link>
      ),
    },
  ];

  return (
    <EntityTable
      data={categories}
      columns={columns}
      filters={filters}
      setFilters={setFilters}
      showFilterInput={showFilterInput}
      setShowFilterInput={setShowFilterInput}
    />
  );
};

export default Categories;
