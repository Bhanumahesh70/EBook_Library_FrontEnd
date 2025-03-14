import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../../assets/Book.jpg';

interface BookProps {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
}

function BookList({ id, title, author, language, publicationYear }: BookProps) {
  return (
    <div className="col-7 col-sm-5 col-md-4 col-lg-3">
      <div className="card shadow-lg h-100 border-0 book-card">
        <img src={BookImage} className="card-img-top book-img" alt={title} />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">
            A great book by <strong>{author}</strong>.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Author:</strong> {author}
          </li>
          <li className="list-group-item">
            <strong>Language:</strong> {language}
          </li>
          <li className="list-group-item">
            <strong>Published Year:</strong> {publicationYear}
          </li>
        </ul>
        <div className="card-body text-center">
          <Link to={`/ebook/books/${id}`} className="btn btn-primary">
            <i className="bi bi-eye"></i> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookList;
