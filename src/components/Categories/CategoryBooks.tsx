import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForCategoryWithId } from '../../services/categoryService';
import BookList from '../Books/BookList';
interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
}
const CategoryBooks = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = React.useState<Book[]>([]);
  const location = useLocation();
  const categoryName = location.state?.categoryName;

  React.useEffect(() => {
    getBooksForCategoryWithId(id).then((data) => setBooks(data));
    console.log('Displaying for category with id: ', id);
  }, [id]);

  const bookElements = books.map((book) => {
    return (
      <BookList
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        language={book.language}
        publicationYear={book.publicationYear}
      />
    );
  });

  return (
    <>
      <h1>Books for Category:{categoryName}</h1>
      <div className="bookContainer">{bookElements}</div>;
    </>
  );
};

export default CategoryBooks;
