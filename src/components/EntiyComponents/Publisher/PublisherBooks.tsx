import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForPublisherWithId } from '../../../services/EntityServices/publisherService';
import { Book } from '../../../services/types';
import BookList from '../../EntiyComponents/Books/BookListGrid';

const PublisherBooks = () => {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = React.useState<Book[]>([]);
  const location = useLocation();
  const publisherName = location.state?.publisherName || 'Unknown Publisher';

  React.useEffect(() => {
    getBooksForPublisherWithId(id).then((data) => setBooks(data));
    console.log('Displaying books for publisher with id: ', id);
  }, [id]);

  return (
    <>
      <h1>{`Books by Publisher: ${publisherName}`}</h1>
      <div className="bookContainer">
        {books.length == 0 ? (
          <p>"Sorry, there are no books available for this publisher!!"</p>
        ) : (
          <BookList booksProp={books} isAllbooks={false} />
        )}
      </div>
    </>
  );
};

export default PublisherBooks;
