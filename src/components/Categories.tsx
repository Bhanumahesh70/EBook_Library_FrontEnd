import React from 'react';
import { getCategories } from '../services/categoryService';
import { Link } from 'react-router-dom';
type Category = {
  id: string;
  categoryName: string;
  description: string;
};
const Categories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

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
            <Link
              to={`${category.id}/edit`}
              state={{ category: category }}
              className="linkButton btn btn-primary"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
