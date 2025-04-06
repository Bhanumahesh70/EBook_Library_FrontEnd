import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import {
  addAuthor,
  updateAuthorById,
  getAuthorById,
} from '../../services/authorService';
import { Author } from '../../services/types';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../../services/formUtilities';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';
import { textInModal, handleModalClosing } from '../../services/modalUtilities';

const AddAuthorForm = () => {
  const defaultAuthor: Author = {
    id: '',
    name: '',
    bio: '',
    nationality: '',
    birthDate: '',
    bookIds: [],
  };
  const [author, setAuthor] = React.useState<Author>(defaultAuthor);

  const { id } = useParams<{ id: string }>();
  console.log('Id for author is : ', id);
  const isEditing = Boolean(id);
  const [showModal, setShowModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      getAuthorById(id).then((data) => setAuthor(data));
    } else {
      setAuthor(defaultAuthor);
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmit<Author>({
      e,
      isEditing,
      entity: author,
      id,
      updateFunction: updateAuthorById,
      addFunction: addAuthor,
      entityName: 'Author',
      setIsError,
      setShowModal,
    });
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    handleInputOnChange<Author>(e, setAuthor);
  }

  function displayTextInModal() {
    return textInModal({ isError, isEditing, entityName: 'Author' });
  }
  function handleCloseFeedBackModal() {
    handleModalClosing<Author>({
      setShowModal,
      isError,
      isEditing,
      url: '/ebook/authors',
      setEntity: setAuthor,
      entity: defaultAuthor,
    });
  }
  return (
    <div className="formHeader">
      <h1>{isEditing ? 'Edit Author' : 'Add New Author'}</h1>

      <div className="container mb-5 formContainer">
        <form className="entityform" onSubmit={handleSubmit}>
          <TextInputField
            label="Name"
            id="name"
            value={author.name}
            onChange={handleOnChange}
          />

          <TextAreaField
            label="Bio"
            id="bio"
            value={author.bio}
            onChange={handleOnChange}
          />

          <TextInputField
            label="Nationality"
            id="nationality"
            value={author.nationality}
            onChange={handleOnChange}
          />

          <TextInputField
            label="Birth Date"
            id="birthDate"
            value={author.birthDate}
            onChange={handleOnChange}
            customType="date"
          />

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Author' : 'Add Author'}
            </button>
          </div>
        </form>
        <FeedBackModal
          showFeedBackModal={showModal}
          displayTextInFeedbackModal={displayTextInModal}
          close={handleCloseFeedBackModal}
        />
      </div>
    </div>
  );
};

export default AddAuthorForm;
