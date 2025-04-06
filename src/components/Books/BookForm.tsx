import React from 'react';
import EntityForm from '../Form/EntityForm';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';
import DropDownList from '../Form/DropDownList';
import { Link } from 'react-router-dom';
import {
  Book,
  Category,
  Author,
  Publisher,
  AuthorsDetails,
  PublisherDetails,
  CategoriesDetails,
} from '../../services/types';
import {
  getBooks,
  updateBook,
  addBook,
  getBooksById,
} from '../../services/bookService';
import { getAuthors } from '../../services/authorService';
import { getPublishers } from '../../services/publisherService';
import { getCategories } from '../../services/categoryService';

const BookForm = () => {
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
  const handleToggleList = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };
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

  const CustomUseEffect = (
    id: string | undefined,
    setEntity: React.Dispatch<React.SetStateAction<Book>>
  ) => {
    console.log('Inside useEffect()......');
    //Here if id means if Editing. If we keep ieEditing Paramater here instead of id,
    //getBooksByID() is not accepting id as there is type parameter error
    if (id) {
      console.log('Getting books by id');
      getBooksById(id).then((data) => {
        setEntity(data);
      });
    } else {
      fetchAndSet('authors', getAuthors, setAllAuthors);
      fetchAndSet('categories', getCategories, setAllCategories);
      fetchAndSet('publishers', getPublishers, setAllPublishers);
      setEntity(defaultBook);
    }
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

  const renderBookFeilds = (
    book: Book,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
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
        handleChange({
          target: { id: 'authorsDetails', value: updatedAuthors },
        } as any);
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
        handleChange({
          target: { id: 'categoriesDetails', value: updatedCategories },
        } as any);
        return updatedCategories;
      });
    };

    const selectPublisher = (publisher: PublisherDetails) => {
      handleToggleList(setShowPublisherList);
      setPublisherDetails({ id: publisher.id, name: publisher.name }); // Update publisherDetails state
      handleChange({
        target: { id: 'publisherDetails', value: publisher },
      } as any);
    };
    return (
      <>
        <TextInputField
          label="Title"
          id="title"
          value={book.title}
          onChange={handleChange}
        />
        <TextInputField
          label="Author"
          id="author"
          value={book.authorsDetails.map((author) => author.name).join(', ')}
          onChange={handleChange}
        />
        <DropDownList
          label="Select Author"
          showList={showAuthorList}
          handleShowList={() => handleToggleList(setShowAuthorList)}
          list={authorsList()}
        />

        <TextInputField
          label="ISBNCode"
          id="isbn"
          value={book.isbn}
          onChange={handleChange}
        />

        <TextInputField
          label="Language"
          id="language"
          value={book.language}
          onChange={handleChange}
        />
        <TextInputField
          label="Category"
          id="category"
          value={book.categoriesDetails
            .map((category) => category.categoryName)
            .join(', ')}
          onChange={handleChange}
        />
        <DropDownList
          label="Select Category"
          showList={showCategoryList}
          handleShowList={() => handleToggleList(setShowCategoryList)}
          list={categoriesList()}
        />

        <TextInputField
          label=" Total Copies"
          id="totalCopies"
          value={book.totalCopies}
          onChange={handleChange}
        />
        <TextInputField
          label="Available Copies"
          id="availableCopies"
          value={book.availableCopies}
          onChange={handleChange}
        />
        <TextInputField
          label="Publisher"
          id="publisher"
          value={book.publisherDetails.name}
          onChange={handleChange}
        />
        <DropDownList
          label="Select Publisher"
          showList={showPublisherList}
          handleShowList={() => handleToggleList(setShowPublisherList)}
          list={publishersList()}
        />

        <TextInputField
          label="Publication Year"
          id="publicationYear"
          value={book.publicationYear}
          onChange={handleChange}
        />
      </>
    );
  };

  return <div>BookForm</div>;
};

export default BookForm;
