import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublisherById } from '../../../services/EntityServices/publisherService';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublisherImage from '../../../assets/Publisher.png';
import { Publisher } from '../../../services/types';

function PublisherDetails() {
  const { id } = useParams<{ id: string }>();
  console.log('Displaying publisher with id:', id);
  const [publisher, setPublisher] = React.useState<Publisher | null>(null);
  const navigate = useNavigate();

  const fetchPublisherDetails = async () => {
    if (!id) {
      console.log('No ID provided');
      return;
    }
    const publisherData = await getPublisherById(id);
    setPublisher(publisherData);
    console.log('Publisher data fetched:', publisherData);
  };

  React.useEffect(() => {
    fetchPublisherDetails();
  }, [id]);

  function viewBooks() {
    console.log('Navigating with publisher name:', publisher?.name);
    navigate(`/ebook/publishers/${publisher?.id}/books`, {
      state: { publisherName: publisher?.name },
    });
  }

  if (!publisher)
    return <p className="text-center mt-5">Loading publisher details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Publisher Image */}
          <div className="col-md-4">
            <img
              src={PublisherImage}
              className="img-fluid rounded-start"
              alt={publisher.name}
            />
          </div>

          {/* Publisher Details */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{publisher.name}</h2>
              <h5 className="text-muted">{publisher.address}</h5>
              <hr />
              <p>
                <strong>Email:</strong> {publisher.email}
              </p>
              <p>
                <strong>Phone:</strong> {publisher.phoneNumber}
              </p>
              <button className="btn btn-primary" onClick={viewBooks}>
                View Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublisherDetails;
