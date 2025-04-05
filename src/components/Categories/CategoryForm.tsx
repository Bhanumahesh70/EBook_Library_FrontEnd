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
import { getCategoryById } from '../../services/categoryService';
import { textInModal, handleModalClosing } from '../../services/modalUtilities';
const CategoryForm = () => {
  const defaultCategory: Category = {
    id: '',
    categoryName: '',
    description: '',
  };
  const [category, setCategory] = React.useState<Category>(defaultCategory);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  const categoryTobeEdit = location.state?.category;
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (isEditing) {
      if (categoryTobeEdit) {
        setCategory({
          id: categoryTobeEdit.id,
          categoryName: categoryTobeEdit.categoryName,
          description: categoryTobeEdit.description,
        });
      } else {
        getCategoryById(id).then((data) => setCategory(data));
      }
    } else {
      setCategory(defaultCategory);
    }
  }, [id]);
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
    return textInModal({ isError, isEditing, entityName: 'Author' });
  }
  function handleCloseFeedBackModal() {
    handleModalClosing<Category>({
      setShowModal,
      isError,
      isEditing,
      url: '/ebook/categories',
      setEntity: setCategory,
      entity: defaultCategory,
    });
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
        close={handleCloseFeedBackModal}
      />
    </div>
  );
};

export default CategoryForm;
