import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addBook, updateBook, getBooksById } from '../services/bookService';
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
  const navigate = useNavigate();

  React.useEffect(() => {
    //Here if id means if Editing. If we keep ieEditing Paramater here instead of id,
    //getBooksByID() is not accepting id as there is type parameter error
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
    if (!isError) {
      if (isEditing) {
        navigate('/');
      }
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
  }
  return (
    <div className="container mb-5 addBookFrom">
      <form onSubmit={handleSubmit}>
        <div className=" mb-3 col-sm">
          <label htmlFor="title" className="col-sm-3 col-form-label">
            Titile
          </label>

          <input
            type="text"
            className=" form-control"
            id="title"
            value={book.title}
            aria-describedby="Book Title"
            onChange={handleOnChange}
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
        style={{ width: '250px' }}
      />
    </div>
  );
};

export default AddBookForm;
