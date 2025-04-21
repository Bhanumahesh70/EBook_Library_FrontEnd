import React, { useEffect, useState } from 'react';
import { useFilterSort } from '../../../services/useFilterSort';
import FilterToggleInput from '../../Utilities/FilterToggleInput';
import { useGlobalSearch } from '../../Utilities/GlobalSearchContext';

interface TProps {
  id: string;
}
interface Column<T> {
  label: string;
  key: string;
  type: 'text' | 'date' | 'select';
  getValue: (item: T) => any;
  filterFn?: (item: T, filterValue: any) => boolean;
  render?: (item: T) => React.ReactNode;
  options?: string[];
  includeFilter?: boolean;
  includeSort?: boolean;
}
interface EntityTableProps<T extends TProps> {
  data: T[];
  columns: Column<T>[];
  filters: Record<string, any>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  showFilterInput: Record<string, boolean>;
  setShowFilterInput: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  heading?: string;
}

const EntityTable = <T extends TProps>({
  data,
  columns,
  filters,
  setFilters,
  showFilterInput,
  setShowFilterInput,
  heading,
}: EntityTableProps<T>) => {
  const { globalSearch } = useGlobalSearch();

  const toggleFilterInput = (key: keyof typeof showFilterInput) => {
    setShowFilterInput((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  console.log('Data:', data);
  const globallyFilteredData = data.filter((item) =>
    columns.some((column) =>
      String(column.getValue(item))
        .toLocaleLowerCase()
        .includes(globalSearch.toLowerCase())
    )
  );
  console.log('Globally filtered data:', globallyFilteredData);
  const filterFunctions = Object.fromEntries(
    columns.map((column) => [
      column.key,
      (item: T) => {
        console.log('column.key:', column.key);
        console.log(
          !column.filterFn || column.filterFn(item, filters[column.key] || '')
        );
        return (
          !column.filterFn || column.filterFn(item, filters[column.key] || '')
        );
      },
    ])
  );
  const sortFunctions = Object.fromEntries(
    columns.map((column) => [column.key, column.getValue])
  );
  const { sortedData, handleSort, sortConfig } = useFilterSort(
    globallyFilteredData,
    filters,
    setFilters,
    filterFunctions,
    sortFunctions
  );
  console.log('sorted data:', sortedData);
  const getSortIcon = (column: string) => {
    if (!sortConfig || sortConfig.sortBy !== column) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️';
  };

  return (
    <div className="table-container">
      <h3 className="text-center my-3">{heading}</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search anything..."
        value={globalSearch}
        readOnly
      />
      <table className="table table-info table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            {columns.map((column) => (
              <th
                onClick={() => handleSort(column.key)}
                style={{ cursor: 'pointer' }}
              >
                {column.label}
                {column.includeSort && getSortIcon(column.key)}
                {column.includeFilter && (
                  <FilterToggleInput
                    show={showFilterInput[column.key]}
                    type={column.type}
                    name={column.key}
                    value={filters[column.key]}
                    onChange={handleFilterChange}
                    onToggle={() => toggleFilterInput(column.key)}
                    placeHolder={`Search ${column.label}`}
                    options={column.options}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : String(column.getValue(item))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;
