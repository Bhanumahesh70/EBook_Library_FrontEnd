import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../../assets/Book.jpg';
import { getBooks } from '../../services/bookService';
import { Book, AuthorsDetails } from '../../services/types';

function BookList() {
  const [books, setBooks] = React.useState<Book[]>([]);

  const refreshBooks = async () => {
    const books = await getBooks();
    setBooks(books);
    return books;
  };

  React.useEffect(() => {
    refreshBooks();
  }, []);

  const authorElements = (authorsDetails: AuthorsDetails[]) => {
    return authorsDetails.map(
      (authorDetail, index) =>
        ` ${authorDetail.name}${index < authorsDetails.length - 1 ? ',' : ''}`
    );
  };
  return books.map((book) => (
    <div className="col-7 col-sm-5 col-md-4 col-lg-3">
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
  ));
}

export default BookList;
