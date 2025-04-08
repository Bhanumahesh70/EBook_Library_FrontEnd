import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Book } from '../../../services/types';
import BookList from '../../EntiyComponents/Books/BookListGrid';

interface EntityBooksProps {
  keyName: string;
  entityType: string;
  fetchBooks: (id: String | undefined) => Promise<Book[]>;
}

const EntityBooks = ({ keyName, entityType, fetchBooks }: EntityBooksProps) => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = React.useState<Book[]>([]);
  const location = useLocation();
  const entityName = location.state?.[keyName] || `Unknown ${entityType}`;
  React.useEffect(() => {
    fetchBooks(id).then((data) => setBooks(data));
    console.log(`Displaying books for ${entityType}: ${entityName}`);
  }, [id, fetchBooks, entityType]);

  return (
    <>
      <h1>{`Books by ${entityType}: ${entityName}`}</h1>
      <div className="">
        {books.length == 0 ? (
          <p>`Sorry, there are no books available for this ${entityType}!!`</p>
        ) : (
          <BookList booksProp={books} isAllbooks={false} />
        )}
      </div>
    </>
  );
};

export default EntityBooks;
