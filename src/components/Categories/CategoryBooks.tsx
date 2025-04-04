import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForCategoryWithId } from '../../services/categoryService';
import BookList from '../Books/BookListGrid';
import { Book } from '../../services/types';
const CategoryBooks = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = React.useState<Book[]>([]);
  const location = useLocation();
  const categoryName = location.state?.categoryName;

  React.useEffect(() => {
    getBooksForCategoryWithId(id).then((data) => setBooks(data));
    console.log('Displaying for category with id: ', id);
  }, [id]);

  return (
    <>
      <h1>Books for Category:{categoryName}</h1>
      <div className="bookContainer">
        {books.length == 0 ? (
          <p>"Sorry, there are no books available for this category!!"</p>
        ) : (
          <BookList booksProp={books} isAllbooks={false} />
        )}
      </div>
      ;
    </>
  );
};

export default CategoryBooks;
