import React from 'react';
import EntityForm from '../../Form/EntityForm';
import TextInputField from '../../Form/TextInputField';
import { handleInputOnChange } from '../../../services/formUtilities';
import { User } from '../../../services/types';
import {
  getUserById,
  addUser,
  updateUserById,
} from '../../../services/EntityServices/userService';

const UserForm = ({ isSignup = false }: { isSignup?: boolean }) => {
  const defaultUser: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'ROLE_USER',
  };

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setEntity: React.Dispatch<React.SetStateAction<User>>
  ) {
    handleInputOnChange(
      e,
      setEntity,
      e.target.name === 'role' ? 'role' : undefined
    );
  }
  const formHeader = () => {
    return (
      <>
        <h1>Welcome EBook Website</h1>
        <h1>Signup to website</h1>
      </>
    );
  };

  const renderUserFeilds = (
    user: User,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    return (
      <>
        <TextInputField
          label="Name"
          id="name"
          value={user.name}
          onChange={handleChange}
        />
        <TextInputField
          label="Email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <TextInputField
          label="Password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />

        <TextInputField
          label="Phone Number"
          id="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
        />
        <TextInputField
          label="Address"
          id="address"
          value={user.address}
          onChange={handleChange}
        />

        {!isSignup && (
          <>
            <TextInputField
              label="User"
              id="user"
              name="role"
              value="ROLE_USER"
              onChange={handleChange}
              customType="radio"
              isChecked={user.role === 'ROLE_USER'}
            />
            <TextInputField
              label="Librarian"
              id="librarian"
              name="role"
              value="ROLE_LIBRARIAN"
              onChange={handleChange}
              customType="radio"
              isChecked={user.role === 'ROLE_LIBRARIAN'}
            />
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
      </>
    );
  };

  return (
    <EntityForm<User>
      defaultEntity={defaultUser}
      getEntityById={getUserById}
      entityName={'User'}
      updateEntity={updateUserById}
      addEntity={addUser}
      urlToNavitageAwayFromForm="/ebook/users"
      customNavigateUrl={isSignup ? '/login' : undefined}
      renderFields={renderUserFeilds}
      customHandleChange={handleOnChange}
      customFormHeading={isSignup ? formHeader : undefined}
      customTextForModal={isSignup ? 'Your Signup Is Successfull!!' : undefined}
    />
  );
};

export default UserForm;
