import React from 'react';
import { getAuthors } from '../../services/authorService';
import { useNavigate } from 'react-router-dom';

type Author = {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  birthDate: string;
  bookIds: string[];
};

const AuthorsList = () => {
  const [authors, setAuthors] = React.useState<Author[]>([]);

  React.useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);

  const navigate = useNavigate();
  function handleClick(id: string) {
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
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id} onClick={() => handleClick(author.id)}>
              <th scope="row">{index + 1}</th>
              <td data-label="Name">{author.name}</td>
              <td data-label="Nationality">{author.nationality}</td>
              <td data-label="Birth Date">{author.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorsList;
