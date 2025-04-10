import React from 'react';
import { getPublishers } from '../../../services/EntityServices/publisherService';
import { useNavigate, Link } from 'react-router-dom';
import { Publisher } from '../../../services/types';

const PublihsersList = () => {
  const [publishers, setPublishers] = React.useState<Publisher[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getPublishers().then((data) => setPublishers(data));
  }, []);

  function handleClick(id: string) {
    console.log('Navigating to edit Pubsliher with id:', id);
    navigate(`/ebook/publishers/${id}`);
  }
  return (
    <div className="table-container">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
            <th scope="col">Email</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher, index) => (
            <tr key={publisher.id || `author-${index}`}>
              <th scope="row">{index + 1}</th>
              <td data-label="Name">{publisher.name}</td>
              <td data-label="Address">{publisher.address}</td>
              <td data-label="Email">{publisher.email}</td>
              <td data-label="PhoneNumber">{publisher.phoneNumber}</td>
              <td data-label="publishers">
                <Link
                  to={`${publisher.id}/books`}
                  state={{ publisherName: publisher?.name }}
                  className="btn btn-outline-primary"
                >
                  Books
                </Link>
              </td>
              <td data-label="details">
                <Link
                  to={`${publisher.id}`}
                  className="btn btn-outline-primary"
                >
                  view
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublihsersList;
