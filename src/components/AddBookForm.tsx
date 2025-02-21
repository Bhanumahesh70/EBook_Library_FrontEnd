import React from 'react';
import { useParams } from 'react-router-dom';
import { addBook, updateBook } from '../services/bookService';
import { getBooksById } from '../services/bookDetailsService';
import FeedBackModal from './FeedBackModal';
interface Props {
  refreshBooks: () => void;
}

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
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [showModal, setShowModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      getBooksById(id).then((data) => {
        setBook(data);
      });
    } else {
      setBook({
        id: '',
        title: '',
        author: '',
        language: '',
        publicationYear: '',
        isbn: '',
        totalCopies: '',
        availableCopies: '',
      });
    }
  }, [id]);
  function displayTextInModal() {
    if (!isError) {
      return isEditing
        ? 'Book is updated successfully'
        : 'Book is added successfully';
    } else {
      return isEditing ? 'Error in updating Book' : 'Error in adding Book';
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (isEditing) {
        const updatedBook = await updateBook(book, id);
        console.log('Book updated Successfully', updatedBook);
      } else {
        const addedBook = await addBook(book);
        console.log('Book added Successfully', addedBook);
      }
      refreshBooks();
      setIsError(false);
    } catch (error) {
      console.error('Error adding/updating book:', error);
      setIsError(true);
    } finally {
      setShowModal(true);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    const { id, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [id]: value }));
  }

  function handleCloseFeedBackModel() {
    setShowModal(false);
  }
  return (
    <div className="container md-5 addBookFrom">
      <form onSubmit={handleSubmit}>
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
      <FeedBackModal
        showFeedBackModal={showModal}
        displayTextInFeedbackModal={displayTextInModal}
        close={handleCloseFeedBackModel}
      />
    </div>
  );
};

export default AddBookForm;
