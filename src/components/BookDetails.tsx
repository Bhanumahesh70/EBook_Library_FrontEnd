import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBooksById } from '../services/bookDetailsService';
import { deleteBookById } from '../services/bookService';
import Modal from './Modal';

interface BookDetailsProps {
  id: string;
  title: string;
  author: string;
  language: string;
  published_year: string;
  isbn: string;
  totalCopies: string;
  availableCopies: string;
}
function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = React.useState<BookDetailsProps | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  //const [book, setBook] = React.useState([])
  React.useEffect(() => {
    if (id) {
      getBooksById(id).then((data) => {
        setBook(data);
      });
    }
  }, [id]);

  function confirmDelete() {
    setShowModal(true);
  }
  async function deleteBook(id: string) {
    try {
      const bookdelete = await deleteBookById(id);
      console.log('Book is deleted Successfully with Id:', id);
      setShowModal(false);
      setShowFeedbackModel(true);
      setIsError(false);
    } catch (error) {
      console.log('Error in deleteing book', error);
      setShowFeedbackModel(true);
      setIsError(true);
    }
  }

  console.log('id', id);
  console.log('book', book);
  if (!book) return <p>Loading...</p>;
  return (
    <>
      <div className="book-details-container">
        <h1>
          {book.title} <span className="details-text">-Details</span>{' '}
        </h1>
        <div className="book-detail-grid">
          <div className={'book-cover'}>
            <img src="../assets/Book" alt={book.title} className="book-image" />
          </div>
          <div className="book-info">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="from-control"
                value={book.title}
                id="title"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                value={book.author}
                id="author"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input
                type="text"
                className="form-control"
                value={book.language}
                id="language"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="pusblished_year">Published Year</label>
              <input
                type="text"
                className="form-control"
                value={book.published_year}
                id="pusblished_year"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                value={book.isbn}
                id="isbn"
                readOnly
              />
            </div>

            <div className="additional-details">
              <h4>Additional Details</h4>

              <p>
                <strong>Available Copies: </strong>
                {book.availableCopies}
              </p>

              <p>
                <strong>Total Copies:</strong>
                {book.totalCopies}
              </p>

              <p>
                <strong>Description:</strong>"description"
              </p>
              <div>
                <Link
                  to={`/books/${id}/edit`}
                  className="btn btn-primary button"
                >
                  Edit Book
                </Link>
              </div>
              <div>
                <button
                  className=" btn btn-danger button "
                  onClick={confirmDelete}
                >
                  Delete Book
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        submit={() => deleteBook(book.id)}
      />
    </>
  );
}

export default BookDetails;
