import React from 'react';
import { getAuthors } from '../../../services/EntityServices/authorService';
import { useNavigate, Link } from 'react-router-dom';
import { Author } from '../../../services/types';

const AuthorsList = () => {
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);
  function handleClick(id: string) {
    console.log('Navigating to edit author with id:', id);
    navigate(`/ebook/authors/${id}`);
  }

  return (
    <div className="table-container">
      <table className="table table-info table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Nationality</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Books</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id || `author-${index}`}>
              <th scope="row">{index + 1}</th>
              <td data-label="Name">{author.name}</td>
              <td data-label="Nationality">{author.nationality}</td>
              <td data-label="Birth Date">{author.birthDate}</td>
              <td data-label="Books">
                <Link
                  to={`${author.id}/books`}
                  state={{ authorName: author?.name }}
                  className="btn btn-outline-primary"
                >
                  Books
                </Link>
              </td>
              <td data-label="details">
                <Link
                  to={`${author.id}/details`}
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

export default AuthorsList;
