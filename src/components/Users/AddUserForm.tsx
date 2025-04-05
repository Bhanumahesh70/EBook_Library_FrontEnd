import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import { addUser, updateUser, getUserById } from '../../services/userService';
import { User } from '../../services/types';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../../services/formUtilities';
import TextInputField from '../Form/TextInputField';
import TextAreaField from '../Form/TextAreaField';

const AddUserForm = ({ isSignup = false }: { isSignup?: boolean }) => {
  const defaultUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'ROLE_USER',
  };
  const [user, setUser] = React.useState(defaultUser);

  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [showModal, setShowModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    //Here if id means if Editing. If we keep ieEditing Paramater here instead of id,
    //getUserByID() is not accepting id as there is type parameter error
    if (id) {
      getUserById(id).then((data) => {
        setUser(data);
      });
    } else {
      setUser(defaultUser);
    }
  }, [id]);
  function displayTextInModal() {
    if (!isError) {
      return isEditing
        ? 'User is updated successfully'
        : 'User is added successfully';
    } else {
      return isEditing ? 'Error in updating User' : 'Error in adding User';
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmit<User>({
      e,
      isEditing,
      entity: user,
      id,
      updateFunction: updateUser,
      addFunction: addUser,
      entityName: 'User',
      setIsError,
      setShowModal,
    });
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputOnChange(
      e,
      setUser,
      e.target.name === 'role' ? 'role' : undefined
    );
  }

  function handleCloseFeedBackModel() {
    setShowModal(false);
    if (!isError) {
      if (isEditing) {
        setUser(defaultUser);
      }
      if (isSignup) {
        navigate('/login');
      }
    }
  }
  return (
    <div className="signupDiv">
      {isSignup && (
        <>
          <h1>Welcome EBook Website</h1>
          <h1>Signup to website</h1>
        </>
      )}
      {isEditing && (
        <>
          <h1>Edit User</h1>
        </>
      )}
      {!isSignup && !isEditing && (
        <>
          <h1>Add new user</h1>
        </>
      )}

      <div className="container mb-5 addUserFormContainer">
        <form className="addUserForm" onSubmit={handleSubmit}>
          <TextInputField
            label="Name"
            id="name"
            value={user.name}
            onChange={handleOnChange}
          />
          <TextInputField
            label="Email"
            id="email"
            value={user.email}
            onChange={handleOnChange}
          />
          <TextInputField
            label="Password"
            id="password"
            value={user.password}
            onChange={handleOnChange}
          />

          <TextInputField
            label="Phone Number"
            id="phoneNumber"
            value={user.phoneNumber}
            onChange={handleOnChange}
          />
          <TextInputField
            label="Address"
            id="address"
            value={user.address}
            onChange={handleOnChange}
          />

          {!isSignup && (
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="user"
                  value="ROLE_USER"
                  onChange={handleOnChange}
                  checked={user.role === 'ROLE_USER'}
                />
                <label className="form-check-label" htmlFor="user">
                  User
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="librarian"
                  value="ROLE_LIBRARIAN"
                  onChange={handleOnChange}
                  checked={user.role === 'ROLE_LIBRARIAN'}
                />
                <label className="form-check-label" htmlFor="LIBRARIAN">
                  Librarian
                </label>
              </div>
              <div>
                <p
                  className={
                    user.role === 'ROLE_LIBRARIAN'
                      ? 'librarian_access_text_display text-primary'
                      : 'librarian_access_text_NotDisplay'
                  }
                >
                  Librarian access request will be sent to admin.
                </p>
                <p
                  className={
                    user.role === 'ROLE_LIBRARIAN'
                      ? 'librarian_access_text_display text-primary'
                      : 'librarian_access_text_NotDisplay'
                  }
                >
                  By default user will get normal user access
                </p>
              </div>
            </>
          )}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <FeedBackModal
          showFeedBackModal={showModal}
          displayTextInFeedbackModal={displayTextInModal}
          close={handleCloseFeedBackModel}
        />
      </div>
    </div>
  );
};

export default AddUserForm;
