import React from 'react';
import EntityForm from '../Form/EntityForm';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';
import { Author } from '../../services/types';
import {
  getAuthorById,
  updateAuthorById,
  addAuthor,
} from '../../services/authorService';

const AuthorForm = () => {
  const defaultAuthor: Author = {
    id: '',
    name: '',
    bio: '',
    nationality: '',
    birthDate: '',
    bookIds: [],
  };

  const renderCategoryFeilds = (
    author: Author,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
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
      renderFields={renderCategoryFeilds}
    />
  );
};

export default AuthorForm;
