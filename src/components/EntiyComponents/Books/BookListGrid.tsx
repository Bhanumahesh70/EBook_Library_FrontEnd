import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../../../assets/Book.jpg';
import { getBooks } from '../../../services/EntityServices/bookService';
import { Book, AuthorsDetails } from '../../../services/types';
import { useBooksIds } from '../AbstractEntity/BooksIdsContext';

interface BooksProp {
  booksProp: Book[];
  isAllbooks: boolean;
}

function BookList({ booksProp, isAllbooks }: BooksProp) {
  const [books, setBooks] = React.useState<Book[]>(booksProp || []);
  const { setBooksIds } = useBooksIds();

  console.log('booksProp:', booksProp);
  console.log('Books:', books);

  const refreshBooks = async () => {
    console.log('Refreshing books...');
    const books = await getBooks();
    setBooks(books);
    const booksIds = books.map((book) => book.id);
    const booksNames = books.map((book) => book.title);
    const booksDetails = books.map((book) => {
      return { id: book.id, name: book.title };
    });
    // setBooksIds(booksDetails);
    console.log('booksIds:', booksIds);
    return books;
  };

  React.useEffect(() => {
    console.log('Inside useEffect. booksprop.length:', booksProp.length);
    console.log('isAllBooks:', isAllbooks);
    if (!isAllbooks) {
      setBooks(booksProp);
    } else {
      refreshBooks();
    }
  }, [booksProp]);

  const authorElements = (authorsDetails: AuthorsDetails[]) => {
    return authorsDetails.map(
      (authorDetail, index) =>
        ` ${authorDetail.name}${index < authorsDetails.length - 1 ? ',' : ''}`
    );
  };
  return (
    <div className="row g-4 justify-content-center m-4 p-4 bookContainer">
      {' '}
      {books.map((book) => (
        <div className="col-7 col-sm-5 col-md-4 col-lg-3" key={book.id}>
          <div className="card shadow-lg h-100 border-0 book-card">
            <img
              src={BookImage}
              className="card-img-top book-img"
              alt={book.title}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text text-muted">Book by:</p>
              <p className="card-text text-muted">
                <strong>{authorElements(book.authorsDetails)}</strong>.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Author:</strong> {authorElements(book.authorsDetails)}
              </li>
              <li className="list-group-item">
                <strong>Language:</strong> {book.language}
              </li>
              <li className="list-group-item">
                <strong>Published Year:</strong> {book.publicationYear}
              </li>
            </ul>
            <div className="card-body text-center">
              <Link to={`/ebook/books/${book.id}`} className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
