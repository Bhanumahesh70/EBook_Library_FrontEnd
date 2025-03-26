import React from 'react';
import {
  addCategory,
  updateCategoryById,
} from '../../services/categoryService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';

type Category = {
  id: string;
  categoryName: string;
  description: string;
};

const CategoryForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryTobeEdit = location.state?.category;
  let initialCategory = () => {
    if (isEditing) {
      return {
        id: categoryTobeEdit.id,
        categoryName: categoryTobeEdit.categoryName,
        description: categoryTobeEdit.description,
      };
    } else {
      return {
        id: '',
        categoryName: '',
        description: '',
      };
    }
  };

  const [category, setCategory] = React.useState<Category>(initialCategory);
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isEditing) {
      try {
        updateCategoryById(id, category);
      } catch (error) {
        setIsError(true);
      }
    } else {
      try {
        addCategory(category);
      } catch (error) {
        setIsError(true);
      }
    }
    setShowFeedbackModel(true);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = event.currentTarget;
    setCategory((prevCategory) => {
      return { ...prevCategory, [id]: value };
    });
  }

  function displayTextInModal() {
    if (isEditing) {
      if (!isError) {
        return `Succesfully edited category: ${category.categoryName}`;
      } else {
        return `Error in editing category: ${category.categoryName}`;
      }
    } else {
      if (!isError) {
        return `Succesfully added category: ${category.categoryName} `;
      } else {
        return `Error in adding category: ${category.categoryName}`;
      }
    }
  }

  function handleCloseFeedBackModel() {
    if (isEditing) {
      navigate(`/ebook/categories`);
    } else {
      setCategory({
        id: '',
        categoryName: '',
        description: '',
      });
    }
    setShowFeedbackModel(false);
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
      <FeedBackModal
        showFeedBackModal={showFeedbackModal}
        displayTextInFeedbackModal={displayTextInModal}
        close={handleCloseFeedBackModel}
      />
    </div>
  );
};

export default CategoryForm;
