import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthorById } from '../../services/authorService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorImage from '../../assets/Author.jpeg';

interface Author {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  birthDate: string;
  bookIds: string[];
}

function AuthorDetails() {
  const { id } = useParams<{ id: string }>();
  console.log('Displaying author with id:', id);
  const [author, setAuthor] = React.useState<Author | null>(null);
  const navigate = useNavigate();
  const fetchAuthorDetails = async () => {
    if (!id) {
      console.log('No ID provided');
      return;
    }
    const authorData = await getAuthorById(id);
    setAuthor(authorData);
    console.log('Author data fetched:', authorData);
  };

  React.useEffect(() => {
    fetchAuthorDetails();
  }, [id]);

  function viewBooks() {
    console.log('Navigating with author name:', author?.name);
    navigate(`/ebook/authors/${author?.id}/books`, {
      state: { authorName: author?.name },
    });
  }
  if (!author)
    return <p className="text-center mt-5">Loading author details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Author Image */}
          <div className="col-md-4">
            <img
              src={AuthorImage}
              className="img-fluid rounded-start"
              alt={author.name}
            />
          </div>

          {/* Author Details */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{author.name}</h2>
              <h5 className="text-muted">{author.nationality}</h5>
              <hr />
              <p>
                <strong>Bio:</strong> {author.bio}
              </p>
              <p>
                <strong>Birth Date:</strong> {author.birthDate}
              </p>
              <button className="btn btn-primary" onClick={viewBooks}>
                Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetails;
