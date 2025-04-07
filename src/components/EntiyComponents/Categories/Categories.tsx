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
    <>
      {categories.map((category) => (
        <div
          key={category.id}
          className="card bookCard"
          style={{ width: '18rem' }}
        >
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{category.categoryName}</h5>
            <p className="card-text">{category.description}</p>
            <Link
              to={`${category.id}/books`}
              state={{ categoryName: category.categoryName }}
              className="linkButton btn btn-primary"
            >
              Books
            </Link>
            {role === 'ROLE_ADMIN' ? (
              <Link
                to={`/ebook/${category.id}/edit`}
                state={{ category: category }}
                className="linkButton btn btn-primary"
              >
                Edit
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
