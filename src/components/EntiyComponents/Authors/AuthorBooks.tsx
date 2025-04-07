import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForAuthorWithId } from '../../../services/EntityServices/authorService';
import BookList from '../Books/BookListGrid';
import { Book } from '../../../services/types';

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
      <div className="row g-4 justify-content-center m-4 p-4 bookContainer">
        {books.length == 0 ? (
          <p>"Sorry, there are no books available for this author!!"</p>
        ) : (
          <BookList booksProp={books} isAllbooks={false} />
        )}
      </div>
    </>
  );
};

export default AuthorBooks;
