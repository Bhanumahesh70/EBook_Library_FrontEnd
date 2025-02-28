import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { deleteBookById, getBooksById } from '../services/bookService';
import Modal from './Modal';
import FeedBackModal from './FeedBackModal';
import BookImage from '../assets/Book.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Category {
  id: string;
  categoryName: string;
  description: string;
}

interface BookDetailsProps {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
  isbn: string;
  totalCopies: string;
  availableCopies: string;
  categories: Category;
}

interface Props {
  refreshBooks: () => void;
}

function BookDetails({ refreshBooks }: Props) {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = React.useState<BookDetailsProps | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      getBooksById(id).then((data) => {
        setBook(data);
      });
    }
  }, [id]);

  const navigate = useNavigate();

  function confirmDelete() {
    setShowModal(true);
  }

  async function deleteBook(id: string) {
    try {
      await deleteBookById(id);
      setIsError(false);
      refreshBooks();
    } catch (error) {
      console.log('Error deleting book', error);
      setIsError(true);
    } finally {
      setShowModal(false);
      setShowFeedbackModel(true);
    }
  }

  function handleCloseFeedbackModel() {
    setShowFeedbackModel(false);
    if (!isError) navigate('/');
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function displayTextInFeedbackModel() {
    return isError ? 'Error in deleting book' : 'Book deleted successfully';
  }

  if (!book) return <p className="text-center mt-5">Loading book details...</p>;

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="row g-0">
            {/* Book Image */}
            <div className="col-md-4">
              <img
                src={BookImage}
                className="img-fluid rounded-start"
                alt={book.title}
              />
            </div>

            {/* Book Details */}
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <h5 className="text-muted">by {book.author}</h5>
                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Language:</strong> {book.language}
                    </p>
                    <p>
                      <strong>Published Year:</strong> {book.publicationYear}
                    </p>
                    <p>
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Total Copies:</strong> {book.totalCopies}
                    </p>
                    <p>
                      <strong>Available Copies:</strong> {book.availableCopies}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 d-flex gap-3">
                  <Link to={`/books/${id}/edit`} className="btn btn-primary">
                    <i className="bi bi-pencil-square"></i> Edit Book
                  </Link>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    <i className="bi bi-trash"></i> Delete Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        showModal={showModal}
        close={handleCloseModal}
        submit={() => deleteBook(book.id)}
      />
      <FeedBackModal
        showFeedBackModal={showFeedbackModal}
        displayTextInFeedbackModal={displayTextInFeedbackModel}
        close={handleCloseFeedbackModel}
      />
    </>
  );
}

export default BookDetails;
