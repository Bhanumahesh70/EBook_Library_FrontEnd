import React from 'react';
import { getCategories } from '../../../services/EntityServices/categoryService';
import { Link } from 'react-router-dom';
import { useRole } from '../../Authentication/RoleContext';
import { Category } from '../../../services/types';

const Categories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { role } = useRole();

  React.useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="table-container">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Books</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id || `category-${index}`}>
              <th scope="row">{index + 1}</th>
              <td data-label="Name">{category.categoryName}</td>
              <td data-label="Description">{category.description}</td>
              <td data-label="Books">
                <Link
                  to={`${category.id}/books`}
                  state={{ categoryName: category?.categoryName }}
                  className="btn btn-outline-primary"
                >
                  Books
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
