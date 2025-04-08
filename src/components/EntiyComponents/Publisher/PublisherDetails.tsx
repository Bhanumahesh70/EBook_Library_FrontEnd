import React from 'react';
import Card from '../../Form/Card';
import {
  deletePublisherById,
  getPublisherById,
} from '../../../services/EntityServices/publisherService';
import PublisherImage from '../../../assets/Publisher.png';
import { useParams, useNavigate } from 'react-router-dom';
import { Publisher } from '../../../services/types';

function PublisherDetails() {
  const [publisher, setPublisher] = React.useState<Publisher | null>(null);

  const navigate = useNavigate();
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
      image={PublisherImage}
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
    />
  );
}

export default PublisherDetails;
