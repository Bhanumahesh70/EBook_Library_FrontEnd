import React from 'react';
import EntityForm from '../Form/EntityForm';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';
import { Category } from '../../services/types';
import {
  getCategoryById,
  addCategory,
  updateCategoryById,
} from '../../services/categoryService';

const CategoryForm = () => {
  const defaultCategory: Category = {
    id: '',
    categoryName: '',
    description: '',
  };

  const renderCategoryFeilds = (
    category: Category,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    return (
      <>
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
      </>
    );
  };
  return (
    <EntityForm<Category>
      defaultEntity={defaultCategory}
      getEntityById={getCategoryById}
      entityName={'Category'}
      updateEntity={updateCategoryById}
      addEntity={addCategory}
      urlToNavitageAwayFromForm="/ebook/categories"
      renderFields={renderCategoryFeilds}
    />
  );
};

export default CategoryForm;
