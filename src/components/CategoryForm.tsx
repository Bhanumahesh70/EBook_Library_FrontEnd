import React from 'react';
import { addCategory } from '../services/categoryService';
type Category = {
  id: string;
  categoryName: string;
  description: string;
};
const CategoryForm = () => {
  const [category, setCategory] = React.useState<Category>({
    id: '',
    categoryName: '',
    description: '',
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addCategory(category);
  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = event.currentTarget;
    setCategory((prevCategory) => {
      return { ...prevCategory, [id]: value };
    });
  }

  return (
    <div className="container categoryForm">
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            value={category.categoryName}
            className="form-control"
            aria-describedby="Categtory Name"
            onChange={handleChange}
          />
        </div>

        <div className="m-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={category.description}
            className="form-control"
            aria-describedby="Category description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="m-3">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
