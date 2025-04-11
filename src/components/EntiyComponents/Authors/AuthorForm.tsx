import React from 'react';
import EntityForm from '../../Form/EntityForm';
import TextInputField from '../../Form/TextInputField';
import TextAreaField from '../../Form/TextAreaField';
import { Author, BookDetails } from '../../../services/types';
import {
  getAuthorById,
  updateAuthorById,
  addAuthor,
} from '../../../services/EntityServices/authorService';
import { useBooksIds } from '../AbstractEntity/BooksIdsContext';
import ListItems from '../../Form/ListItems';
import DropDownList from '../../Form/DropDownList';

const AuthorForm = () => {
  const defaultAuthor: Author = {
    id: '',
    name: '',
    bio: '',
    nationality: '',
    birthDate: '',
    bookDetails: [],
  };
  /*
 // const { booksDetails } = useBooksIds();
 // const [showBookList, setShowBookList] = React.useState(false);
  //const [authorBooks, setAuthorBooks] = React.useState<BookDetails[]>([]);

  const handleToggleList = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };
  */
  const renderAuthorFeilds = (
    author: Author,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    /*
    const booksList = () => {

      return (
        <ListItems
          items={booksDetails}
          selectItem={selectBook}
          urlTemplate={(id) => `/ebook/books/${id}`}
        />
      );
    };
  
    const selectBook = (book: BookDetails) => {
     
      handleToggleList(setShowBookList);

      setAuthorBooks((prev) => {
        let updatedAuthorBooks: BookDetails[];
        if (prev.some((b) => b.id === book.id)) {
          updatedAuthorBooks = prev.filter((b) => b.id !== book.id);
        } else {
          updatedAuthorBooks = [...prev, { id: book.id, name: book.name }];
        }

        handleChange({
          target: { id: 'bookDetails', value: updatedAuthorBooks },
        } as any);
        return updatedAuthorBooks;
      });
    };
*/
    return (
      <>
        <TextInputField
          label="Name"
          id="name"
          value={author.name}
          onChange={handleChange}
        />

        <TextAreaField
          label="Bio"
          id="bio"
          value={author.bio}
          onChange={handleChange}
        />

        <TextInputField
          label="Nationality"
          id="nationality"
          value={author.nationality}
          onChange={handleChange}
        />

        <TextInputField
          label="Birth Date"
          id="birthDate"
          value={author.birthDate}
          onChange={handleChange}
          customType="date"
        />
      </>
    );
  };

  return (
    <EntityForm<Author>
      defaultEntity={defaultAuthor}
      getEntityById={getAuthorById}
      entityName={'Author'}
      updateEntity={updateAuthorById}
      addEntity={addAuthor}
      urlToNavitageAwayFromForm="/ebook/authors"
      renderFields={renderAuthorFeilds}
    />
  );
};

export default AuthorForm;
