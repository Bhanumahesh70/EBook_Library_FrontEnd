import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import { addUser, updateUser, getUserById } from '../../services/userService';

const AddUserForm = ({ isSignup = false }: { isSignup?: boolean }) => {
  const [user, setUser] = React.useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: '',
  });

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
      setUser({
        id: '',
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
      });
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
    e.preventDefault();
    try {
      if (isEditing) {
        const updatedUser = await updateUser(user, id);
        console.log('User updated Successfully', updatedUser);
      } else {
        const addedUser = await addUser(user);
        console.log('User added Successfully', addedUser);
      }
      setIsError(false);
    } catch (error) {
      console.error('Error adding/updating user:', error);
      setIsError(true);
    } finally {
      setShowModal(true);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    const { id, value, checked, type } = e.target;
    if (type === 'radio') {
      if (checked) {
        setUser((prevUser) => ({ ...prevUser, role: value }));
      }
    } else {
      setUser((prevUser) => ({ ...prevUser, [id]: value }));
    }
  }

  function handleCloseFeedBackModel() {
    setShowModal(false);
    if (!isError) {
      if (isEditing) {
        setUser({
          id: ' ',
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
          role: '',
        });
        // navigate('/');
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
      {!isSignup && (
        <>
          <h1>Add new user</h1>
        </>
      )}

      <div className="container mb-5 addUserFormContainer">
        <form className="addUserForm" onSubmit={handleSubmit}>
          <div className=" mb-3 col-sm">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Name
            </label>

            <input
              type="text"
              className=" form-control"
              id="name"
              value={user.name}
              aria-describedby="User Name"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={user.email}
              aria-describedby="user email"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={user.password}
              aria-describedby="user password"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={user.phoneNumber}
              aria-describedby="phoneNumber"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={user.address}
              aria-describedby="user address"
              onChange={handleOnChange}
              style={{ width: '250px' }}
            />
          </div>
          {!isSignup && (
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="user"
                  value="user"
                  onChange={handleOnChange}
                  checked={user.role === 'user'}
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
                  value="librarian"
                  onChange={handleOnChange}
                  checked={user.role === 'librarian'}
                />
                <label className="form-check-label" htmlFor="librarian">
                  Librarian
                </label>
              </div>
              <div style={{ minHeight: '40px' }}>
                <p
                  style={{
                    opacity: user.role === 'librarian' ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  Librarian access request will be sent to admin.
                </p>
                <p
                  style={{
                    opacity: user.role === 'librarian' ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  By default you will get normal user access
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
