import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBooksForPublisherWithId } from '../../services/publisherService';
import BookList from '../Books/BookList';

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
}

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

export default PublisherBooks;
