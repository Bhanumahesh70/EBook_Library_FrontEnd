import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../../assets/Book.jpg';
import { getBooks } from '../../services/bookService';
import { getAuthorById } from '../../services/authorService';
import { Book, Author } from '../../services/types';

function BookList() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [authors, setAuthors] = React.useState<Author[]>([]);
  // const [token, setToken] = React.useState<string | null>(null);

  const refreshBooks = async () => {
    const books = await getBooks();
    setBooks(books);
    return books;
  };
  const fetchAuthors = async (authorsIds: string[]) => {
    console.log('fetching author details for books');
    console.log('authorsIds: ', authorsIds);
    return await Promise.all(
      authorsIds.map((authorsId) => getAuthorById(authorsId))
    );
  };
  React.useEffect(() => {
    // Wait for the token to be available in localStorage
    // const storedToken = localStorage.getItem('authToken');
    // if (storedToken) {
    // setToken(storedToken);
    const booksData = refreshBooks();
    //  } else {
    //  console.log('Token not found. Not fetching books.');
    //}

    const authorsData = await fetchAuthors(bookData.authorIds);
    setAuthors(authorsData);
    console.log('Authors Data is fetched: ', authorsData);
  }, []);

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
          <p className="card-text text-muted">
            A great book by <strong>{book.author}</strong>.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Author:</strong> {book.author}
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
