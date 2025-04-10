import React from 'react';
import EntityForm from '../../Form/EntityForm';
import TextInputField from '../../Form/TextInputField';
import TextAreaField from '../../Form/TextAreaField';
import { Publisher } from '../../../services/types';
import {
  getPublisherById,
  updatePublisher,
  addPublisher,
} from '../../../services/EntityServices/publisherService';
const PublisherForm = () => {
  const defaulPublisher: Publisher = {
    id: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    bookIds: [],
  };
  const renderPublisherFeilds = (
    publisher: Publisher,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    return (
      <>
        <TextInputField
          label="Name"
          id="name"
          value={publisher.name}
          onChange={handleChange}
        />

        <TextInputField
          label="Address"
          id="address"
          value={publisher.address}
          onChange={handleChange}
        />

        <TextInputField
          label="Email"
          id="email"
          value={publisher.email}
          onChange={handleChange}
          customType="email"
        />

        <TextInputField
          label="PhoneNumber"
          id="phoneNumber"
          value={publisher.phoneNumber}
          onChange={handleChange}
        />
      </>
    );
  };

  return (
    <EntityForm<Publisher>
      defaultEntity={defaulPublisher}
      getEntityById={getPublisherById}
      entityName={'Publisher'}
      updateEntity={updatePublisher}
      addEntity={addPublisher}
      urlToNavitageAwayFromForm="/ebook/publishers"
      renderFields={renderPublisherFeilds}
    />
  );
};

export default PublisherForm;
