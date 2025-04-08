import EntityBooks from '../AbstractEntity/EntityBooks';

import { getBooksForCategoryWithId } from '../../../services/EntityServices/categoryService';

const CategoryBooks = () => {
  return (
    <EntityBooks
      keyName="categoryName"
      entityType="Category"
      fetchBooks={getBooksForCategoryWithId}
    />
  );
};

export default CategoryBooks;
