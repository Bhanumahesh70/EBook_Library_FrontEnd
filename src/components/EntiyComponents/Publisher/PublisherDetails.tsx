import React from 'react';
import Card from '../../Form/Card';
import {
  deletePublisherById,
  getPublisherById,
} from '../../../services/EntityServices/publisherService';
import PublisherImage from '../../../assets/Publisher.png';
import { useNavigate } from 'react-router-dom';
import { Publisher } from '../../../services/types';
import { useLoginUser } from '../../Authentication/LoginUserContext';

function PublisherDetails() {
  const [publisher, setPublisher] = React.useState<Publisher | null>(null);
  const navigate = useNavigate();
  const { loginUserDetails } = useLoginUser();
  const role = loginUserDetails.role;
  function viewBooks() {
    console.log('Navigating with publisher name:', publisher?.name);
    navigate(`/ebook/publishers/${publisher?.id}/books`, {
      state: { publisherName: publisher?.name },
    });
  }
  const publisherDetails = () => {
    return [
      { label: 'Email', value: publisher?.email },
      { label: 'Phone', value: publisher?.phoneNumber },
    ];
  };
  return (
    <Card
      image={publisher?.coverImageUrl || PublisherImage}
      alt="Publisher"
      title={publisher?.name}
      subtitle={publisher?.address}
      getEnityById={getPublisherById}
      deleteEntityById={deletePublisherById}
      entityName="Publisher"
      customButtonText={'Books'}
      customButtonClickAction={viewBooks}
      details={publisherDetails()}
      onEntityLoad={setPublisher}
      includeEditButton={role === `ROLE_ADMIN`}
      editClickUrl={`/ebook/publishers/${publisher?.id}/form`}
    />
  );
}

export default PublisherDetails;
