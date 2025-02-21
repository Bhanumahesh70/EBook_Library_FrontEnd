import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBooksById } from '../services/bookDetailsService';
import { deleteBookById } from '../services/bookService';

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
    } catch (error) {
      console.log('Error in deleteing book', error);
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
              <label htmlFor="language">ISBN</label>
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
      <div
        className={showModal ? 'modal fade show' : 'modal fade'}
        style={showModal ? { display: 'block' } : {}}
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to delete</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
