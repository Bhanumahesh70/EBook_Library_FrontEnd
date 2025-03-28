import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForAuthorWithId } from '../../services/authorService';
import BookList from '../Books/BookList';
import { Book } from '../../services/types';

const AuthorBooks = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = React.useState<Book[]>([]);
  const location = useLocation();
  const authorName = location.state?.authorName || 'unkownAuthor';

  React.useEffect(() => {
    getBooksForAuthorWithId(id).then((data) => setBooks(data));
    console.log('Displaying books for author with id: ', id);
  }, [id]);

  return (
    <>
      <h1>{`Books by Author: ${authorName}`}</h1>
      <div className="bookContainer">
        {books.map((book) => (
          <BookList
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            language={book.language}
            publicationYear={book.publicationYear}
          />
        ))}
      </div>
    </>
  );
};

export default AuthorBooks;
