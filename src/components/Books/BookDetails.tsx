import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { deleteBookById, getBooksById } from '../../services/bookService';
import Modal from '../Modals/Modal';
import FeedBackModal from '../Modals/FeedBackModal';
import BookImage from '../../assets/Book.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategoryById } from '../../services/categoryService';
import { getPublisherById } from '../../services/publisherService';
import { getAuthorById } from '../../services/authorService';

interface Category {
  id: string;
  categoryName: string;
  description: string;
}
type Publisher = {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  bookIds: number[];
};
interface BookDetailsProps {
  id: string;
  title: string;
  //author: string;
  language: string;
  publicationYear: string;
  isbn: string;
  totalCopies: string;
  availableCopies: string;
  publisherId: string;
  categoryIds: string[];
  authorIds: string[];
}
type Author = {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  birthDate: string;
  bookIds: string[];
};

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  console.log('Displaying book with id:', id);
  const [book, setBook] = React.useState<BookDetailsProps | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [publisher, setpublisher] = React.useState<Publisher>();
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const fetchCategories = async (categoryIds: string[]) => {
    return await Promise.all(
      categoryIds.map((categoryId) => getCategoryById(categoryId))
    );
  };
  const fetchAuthors = async (authorsIds: string[]) => {
    console.log('fetching author details for books');
    console.log('authorsIds: ', authorsIds);
    return await Promise.all(
      authorsIds.map((authorsId) => getAuthorById(authorsId))
    );
  };
  const fetchBookDetails = async () => {
    if (!id) {
      console.log('Not id returning.....', id);
      return;
    }
    const bookData = await getBooksById(id);
    setBook(bookData);
    console.log('BookData is fetched: ', bookData);

    const categoriesData = await fetchCategories(bookData.categoryIds);
    setCategories(categoriesData);
    console.log('CategoriesData is fetched: ', categoriesData);

    const authorsData = await fetchAuthors(bookData.authorIds);
    setAuthors(authorsData);
    console.log('Authors Data is fetched: ', authorsData);

    const publisherData = await getPublisherById(bookData.publisherId);
    setpublisher(publisherData);
    console.log('PublisherData is fetched: ', publisherData);
  };

  React.useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const navigate = useNavigate();

  function confirmDelete() {
    setShowModal(true);
  }

  async function deleteBook(id: string) {
    try {
      await deleteBookById(id);
      setIsError(false);
      //refreshBooks();
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
    if (!isError) navigate('/ebook');
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const categoryElements = () => {
    return categories.map((category) => (
      <p key={category.categoryName} style={{ display: 'inline' }}>
        <Link
          className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          to={`/ebook/categories/${category.id}/books`}
          state={{ categoryName: category.categoryName }}
        >
          {category.categoryName}{' '}
        </Link>
      </p>
    ));
  };
  const authorElements = () => {
    return authors.map((author, index) => (
      <span key={author.id || index}>
        <Link
          className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          to={`/ebook/authors/${author.id}`}
          //state={{ categoryName: category.categoryName }}
        >
          {author.name}
        </Link>

        {index < authors.length - 1 ? ', ' : ''}
      </span>
    ));
  };
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

                <h5 className="text-muted">
                  <strong>By: </strong>
                  {authorElements()}
                </h5>
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
                      <strong>Publisher</strong> {publisher?.name}
                    </p>
                    <p>
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <strong>Genere: </strong>
                    {categoryElements()}
                    <p></p>
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
                  <Link
                    to={`/ebook/books/${id}/edit`}
                    className="btn btn-primary"
                  >
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
