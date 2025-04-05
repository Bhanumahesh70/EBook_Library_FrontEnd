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

const AddAuthorForm = () => {
  const [author, setAuthor] = React.useState<Author>({
    id: '',
    name: '',
    bio: '',
    nationality: '',
    birthDate: '',
    bookIds: [],
  });

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
      setAuthor({
        id: '',
        name: '',
        bio: '',
        nationality: '',
        birthDate: '',
        bookIds: [],
      });
    }
  }, [id]);

  function displayTextInModal() {
    return isError
      ? isEditing
        ? 'Error updating author'
        : 'Error adding author'
      : isEditing
      ? 'Author updated successfully'
      : 'Author added successfully';
  }
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

  function handleCloseFeedBackModal() {
    setShowModal(false);
    if (!isError) {
      navigate('/ebook/authors');
    }
  }

  return (
    <div className="Edit-new-authorDiv">
      <h1>{isEditing ? 'Edit Author' : 'Add New Author'}</h1>

      <div className="container mb-5 author-form-container">
        <form className="author-form" onSubmit={handleSubmit}>
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
