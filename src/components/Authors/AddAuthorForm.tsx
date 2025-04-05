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
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={author.name}
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-control"
              id="bio"
              value={author.bio}
              onChange={handleOnChange}
              rows={3}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nationality" className="form-label">
              Nationality
            </label>
            <input
              type="text"
              className="form-control"
              id="nationality"
              value={author.nationality}
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              value={author.birthDate}
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

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
