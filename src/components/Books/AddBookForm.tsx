import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addBook, updateBook, getBooksById } from '../../services/bookService';
import FeedBackModal from '../Modals/FeedBackModal';
import {
  Book,
  Category,
  AuthorsDetails,
  Author,
  CategoriesDetails,
  PublisherDetails,
  Publisher,
} from '../../services/types';
import { getAuthors } from '../../services/authorService';
import { getCategories } from '../../services/categoryService';
import { getPublishers } from '../../services/publisherService';

const AddBookForm = () => {
  const [book, setBook] = React.useState<Book>({
    id: ' ',
    title: '',
    language: '',
    publicationYear: '',
    isbn: '',
    totalCopies: '',
    availableCopies: '',
    publisherId: '',
    authorsDetails: [],
    categoriesDetails: [],
    publisherDetails: { id: '', name: '' },
  });
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [showModal, setShowModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [showAuthorList, setShowAuthorList] = React.useState(false);
  const [showCategoryList, setShowCategoryList] = React.useState(false);
  const [showPublisherList, setShowPublisherList] = React.useState(false);
  const [allAuthors, setAllAuthors] = React.useState<Author[]>([]);
  const [allCategories, setAllCategories] = React.useState<Category[]>([]);
  const [allPublishers, setAllPublishers] = React.useState<Publisher[]>([]);
  const [categoryDetails, setCategoryDetails] = React.useState<
    CategoriesDetails[]
  >([]);
  const [authorDetails, setAuthorDetails] = React.useState<AuthorsDetails[]>(
    []
  );
  const [publisherDetails, setPublisherDetails] =
    React.useState<PublisherDetails | null>(null);

  const navigate = useNavigate();

  const fetchAuthorData = async () => {
    console.log('fetching authors data....');
    const authorsData = await getAuthors();
    setAllAuthors((prev) => [...authorsData]);
    console.log('Authors data: ', authorsData);
  };
  const fetchCategoriesData = async () => {
    console.log('fetching categories data....');
    const categoriesData = await getCategories();
    setAllCategories((prev) => [...categoriesData]);
    console.log('Authors data: ', categoriesData);
  };
  const fetchPublishersData = async () => {
    console.log('fetching publishers data....');
    const publishersData = await getPublishers(); // Assuming you have a `getPublishers` service function
    setAllPublishers((prev) => [...publishersData]);
    console.log('Publishers data: ', publishersData);
  };
  React.useEffect(() => {
    console.log('Inside useEffect()......');
    //Here if id means if Editing. If we keep ieEditing Paramater here instead of id,
    //getBooksByID() is not accepting id as there is type parameter error
    if (id) {
      console.log('Getting books by id');
      getBooksById(id).then((data) => {
        setBook(data);
      });
    } else {
      fetchAuthorData();
      fetchCategoriesData();
      fetchPublishersData();
      setBook({
        id: ' ',
        title: '',
        language: '',
        publicationYear: '',
        isbn: '',
        totalCopies: '',
        availableCopies: '',
        publisherId: '',
        authorsDetails: [],
        categoriesDetails: [],
        publisherDetails: { id: '', name: '' },
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
      //refreshBooks();
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
        navigate('/ebook');
      }
      setBook({
        id: '',
        title: '',
        author: '',
        language: '',
        publicationYear: '',
        isbn: '',
        totalCopies: '',
        // availableCopies: '',
        categoriesDTO: [],
      });
    }
  }

  const handleShowAuthorList = () => {
    setShowAuthorList((prev) => !prev);
  };
  const handleShowCategoryList = () => {
    setShowCategoryList((prev) => !prev);
  };
  const authorsList = () => {
    return allAuthors.map((author) => (
      <li key={author.id}>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => selectAuthor(author)}
        >
          {author.name}
        </button>
        <Link
          to={`/ebook/authors/${author.id}/details`}
          className="btn btn-outline-primary"
        >
          view
        </Link>
      </li>
    ));
  };
  const categoriesList = () => {
    return allCategories.map((category) => (
      <li key={category.id}>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => selectCategory(category)}
        >
          {category.categoryName}
        </button>
        <Link
          to={`/ebook/categories/${category.id}/details`}
          className="btn btn-outline-primary"
        >
          view
        </Link>
      </li>
    ));
  };
  const publishersList = () => {
    return allPublishers.map((publisher) => (
      <li key={publisher.id}>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => selectPublisher(publisher)}
        >
          {publisher.name}
        </button>
        <Link
          to={`/ebook/publishers/${publisher.id}/details`}
          className="btn btn-outline-primary"
        >
          view
        </Link>
      </li>
    ));
  };
  const selectAuthor = (author: Author) => {
    setShowAuthorList((prev) => !prev);

    setAuthorDetails((prev) => {
      let updatedAuthors: AuthorsDetails[];
      if (prev.some((a) => a.id === author.id)) {
        updatedAuthors = prev.filter((a) => a.id !== author.id);
      } else {
        updatedAuthors = [...prev, { id: author.id, name: author.name }];
      }
      setBook((prevBook) => ({ ...prevBook, authorsDetails: updatedAuthors }));

      return updatedAuthors;
    });
  };

  const selectCategory = (category: Category) => {
    setShowCategoryList((prev) => !prev);
    setCategoryDetails((prev) => {
      let updatedCategories: CategoriesDetails[];
      if (prev.some((c) => c.id === category.id)) {
        updatedCategories = prev.filter((c) => c.id !== category.id);
      } else {
        updatedCategories = [
          ...prev,
          { id: category.id, categoryName: category.categoryName },
        ];
      }
      setBook((prevBook) => ({
        ...prevBook,
        categoriesDetails: updatedCategories,
      }));
      return updatedCategories;
    });
  };
  const selectPublisher = (publisher: PublisherDetails) => {
    setPublisherDetails({ id: publisher.id, name: publisher.name }); // Update publisherDetails state
    setBook((prevBook) => ({
      ...prevBook,
      publisherDetails: publisher,
    }));
  };
  return (
    <>
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
              value={book.authorsDetails.map((author) => author.name)}
              aria-describedby="Book author"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleShowAuthorList}
              >
                select Author
              </button>
              <ul
                className={`dropdown-menu ${showAuthorList ? 'show' : ''}`}
                aria-labelledby="dropdownMenuButton"
              >
                {authorsList()}
              </ul>
            </div>
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
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={book.categoriesDetails.map(
                (category) => category.categoryName
              )}
              aria-describedby="Book category"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleShowCategoryList}
              >
                select Category
              </button>
              <ul
                className={`dropdown-menu ${showCategoryList ? 'show' : ''}`}
                aria-labelledby="dropdownMenuButton"
              >
                {categoriesList()}
              </ul>
            </div>
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
            <label htmlFor="availableCopies" className="form-label">
              Available Copies
            </label>
            <input
              type="text"
              className="form-control"
              id="availableCopies"
              value={book.availableCopies}
              aria-describedby="Book available Copies"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Publisher
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              value={book.publisherDetails?.name || ''}
              aria-describedby="Book publisher"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setShowPublisherList((prev) => !prev)}
              >
                select Publisher
              </button>
              <ul
                className={`dropdown-menu ${showPublisherList ? 'show' : ''}`}
                aria-labelledby="dropdownMenuButton"
              >
                {publishersList()}
              </ul>
            </div>
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
        />
      </div>
    </>
  );
};

export default AddBookForm;
