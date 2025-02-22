import React from 'react';
import { Link } from 'react-router-dom';

interface bookProps {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
}
function BookList({ id, title, author, language, publicationYear }: bookProps) {
  return (
    <div className="card bookCard" style={{ width: '18rem' }}>
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Author: {author}</li>
        <li className="list-group-item">Language:{language}</li>
        <li className="list-group-item">Published Year:{publicationYear}</li>
      </ul>
      <div className="card-body">
        <Link to={`books/${id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BookList;
