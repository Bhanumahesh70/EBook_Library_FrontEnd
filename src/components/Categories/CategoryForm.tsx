import React from 'react';
import {
  addCategory,
  updateCategoryById,
} from '../../services/categoryService';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import { Category } from '../../services/types';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../../services/formUtilities';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmit<Category>({
      e,
      isEditing,
      entity: category,
      id,
      updateFunction: updateCategoryById,
      addFunction: addCategory,
      entityName: 'Category',
      setIsError,
      setShowModal: setShowFeedbackModel,
    });
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    handleInputOnChange<Category>(e, setCategory);
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
        <TextInputField
          label=" Name"
          id="categoryName"
          value={category.categoryName}
          onChange={handleChange}
        />
        <TextAreaField
          label=" Description"
          id="description"
          value={category.description}
          onChange={handleChange}
        />
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
