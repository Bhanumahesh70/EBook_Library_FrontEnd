import React from 'react';
interface Props {
  refreshBooks: () => void;
}
import { addBook } from '../services/bookService';
const AddBookForm = ({ refreshBooks }: Props) => {
  const [book, setBook] = React.useState({
    id: ' ',
    title: '',
    author: '',
    language: '',
    publicationYear: '',
    isbn: '',
    totalCopies: '',
    availableCopies: '',
  });

  const [message, setMessage] = React.useState(' ');
  const [messageType, setMessageType] = React.useState('');
  async function addNewBook(e) {
    e.preventDefault();
    try {
      const addedBook = await addBook(book);
      console.log('Book added Successfully', addedBook);
      setMessage('Book is added Successfully');
      setMessageType('sucess');
      refreshBooks();
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage('Failed to add Book. Error in adding book');
      setMessageType('error');
    }
  }

  function handleOnChange(e) {
    console.log(e);
    const { id, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [id]: value }));
  }
  return (
    <div>
      <form onSubmit={addNewBook}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titile
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={book.title}
            aria-describedby="Book Title"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={book.author}
            aria-describedby="Book author"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISDN Code
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            value={book.isbn}
            aria-describedby="Book isbn"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            value={book.language}
            aria-describedby="Book language"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="totalCopies" className="form-label">
            Total Copies
          </label>
          <input
            type="text"
            className="form-control"
            id="totalCopies"
            value={book.totalCopies}
            aria-describedby="Book total Copies"
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="publicationYear" className="form-label">
            Publication Year
          </label>
          <input
            type="text"
            className="form-control"
            id="publicationYear"
            value={book.publicationYear}
            aria-describedby="Book publication year"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {message && (
        <div className={`alert alert-${messageType}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default AddBookForm;
