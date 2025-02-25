import React from 'react';
import { getCategories } from '../services/categoryService';
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
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
