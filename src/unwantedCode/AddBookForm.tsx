import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  addBook,
  updateBook,
  getBooksById,
} from '../services/EntityServices/bookService';
import FeedBackModal from '../components/Modals/FeedBackModal';
import {
  Book,
  Category,
  AuthorsDetails,
  Author,
  CategoriesDetails,
  PublisherDetails,
  Publisher,
} from '../services/types';
import { getAuthors } from '../services/EntityServices/authorService';
import { getCategories } from '../services/EntityServices/categoryService';
import { getPublishers } from '../services/EntityServices/publisherService';
import TextInputField from '../components/Form/TextInputField';
import DropDownList from '../components/Form/DropDownList';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../services/formUtilities';
import { textInModal, handleModalClosing } from '../services/modalUtilities';
const AddBookForm = () => {
  const defaultBook: Book = {
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
  };
  const [book, setBook] = React.useState<Book>(defaultBook);
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

  const fetchAndSet = async (
    label: string,
    getFunction: () => {},
    setFunction: (value: React.SetStateAction<any>) => void
  ) => {
    console.log(`fetching ${label} data....`);
    const data = await getFunction();
    setFunction(data);
    console.log(`${label} data: `, data);
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
      fetchAndSet('authors', getAuthors, setAllAuthors);
      fetchAndSet('categories', getCategories, setAllCategories);
      fetchAndSet('publishers', getPublishers, setAllPublishers);
      setBook(defaultBook);
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmit<Book>({
      e,
      isEditing,
      entity: book,
      id,
      updateFunction: updateBook,
      addFunction: addBook,
      entityName: 'Book',
      setIsError,
      setShowModal,
    });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputOnChange<Book>(e, setBook);
  }

  const handleToggleList = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  const renderList = <
    T extends { id: string; name?: string; categoryName?: string }
  >(
    items: T[],
    selectItem: (item: T) => void,
    urlTemplate: (id: string) => string
  ) => {
    return items.map((item) => (
      <li key={item.id} className="DropDownListItems">
        <button
          className="dropdown-item"
          type="button"
          onClick={() => selectItem(item)}
        >
          {item.name || item.categoryName}
        </button>
        <Link to={urlTemplate(item.id)} className="btn btn-outline-primary">
          view
        </Link>
      </li>
    ));
  };
  const authorsList = () => {
    return renderList<Author>(
      allAuthors,
      selectAuthor,
      (id) => `/ebook/authors/${id}/details`
    );
  };
  const categoriesList = () =>
    renderList<Category>(
      allCategories,
      selectCategory,
      (id) => `/ebook/categories/${id}/details`
    );

  const publishersList = () =>
    renderList<Publisher>(
      allPublishers,
      selectPublisher,
      (id) => `/ebook/publishers/${id}/details`
    );

  const selectAuthor = (author: Author) => {
    handleToggleList(setShowAuthorList);

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
    handleToggleList(setShowCategoryList);

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
    handleToggleList(setShowPublisherList);
    setPublisherDetails({ id: publisher.id, name: publisher.name }); // Update publisherDetails state
    setBook((prevBook) => ({
      ...prevBook,
      publisherDetails: publisher,
    }));
  };

  function displayTextInModal() {
    return textInModal({ isError, isEditing, entityName: 'Book' });
  }

  function handleCloseFeedBackModal() {
    handleModalClosing<Book>({
      setShowModal,
      isError,
      isEditing,
      url: 'ebook',
      setEntity: setBook,
      entity: defaultBook,
      navigate,
    });
  }
  return (
    <>
      <div className="formHeader book-formHeader">
        <h1>{isEditing ? 'Edit Book' : 'Add New Book'}</h1>
        <div className="container mb-5 formContainer">
          <form onSubmit={handleSubmit}>
            <TextInputField
              label="Title"
              id="title"
              value={book.title}
              onChange={handleOnChange}
            />
            <TextInputField
              label="Author"
              id="author"
              value={book.authorsDetails
                .map((author) => author.name)
                .join(', ')}
              onChange={handleOnChange}
            />
            <DropDownList
              label="Select Author"
              showList={showAuthorList}
              handleShowList={() => handleToggleList(setShowAuthorList)}
              listItems={authorsList()}
            />

            <TextInputField
              label="ISBNCode"
              id="isbn"
              value={book.isbn}
              onChange={handleOnChange}
            />

            <TextInputField
              label="Language"
              id="language"
              value={book.language}
              onChange={handleOnChange}
            />
            <TextInputField
              label="Category"
              id="category"
              value={book.categoriesDetails
                .map((category) => category.categoryName)
                .join(', ')}
              onChange={handleOnChange}
            />
            <DropDownList
              label="Select Category"
              showList={showCategoryList}
              handleShowList={() => handleToggleList(setShowCategoryList)}
              listItems={categoriesList()}
            />

            <TextInputField
              label=" Total Copies"
              id="totalCopies"
              value={book.totalCopies}
              onChange={handleOnChange}
            />
            <TextInputField
              label="Available Copies"
              id="availableCopies"
              value={book.availableCopies}
              onChange={handleOnChange}
            />
            <TextInputField
              label="Publisher"
              id="publisher"
              value={book.publisherDetails.name}
              onChange={handleOnChange}
            />
            <DropDownList
              label="Select Publisher"
              showList={showPublisherList}
              handleShowList={() => handleToggleList(setShowPublisherList)}
              listItems={publishersList()}
            />

            <TextInputField
              label="Publication Year"
              id="publicationYear"
              value={book.publicationYear}
              onChange={handleOnChange}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <FeedBackModal
            showFeedBackModal={showModal}
            displayTextInFeedbackModal={displayTextInModal}
            close={handleCloseFeedBackModal}
          />
        </div>
      </div>
    </>
  );
};

export default AddBookForm;
