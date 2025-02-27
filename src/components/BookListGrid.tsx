import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../assets/Book.jpg';

interface BookProps {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
}

interface BookListGridProps {
  books: BookProps[];
}

function BookListGrid({
  id,
  title,
  author,
  language,
  publicationYear,
}: BookProps) {
  return (
    <div className="book-grid">
      <div key={id} className="book-card">
        <img className="book-img" src={BookImage} alt={title} />
        <div className="book-details">
          <h3>{title}</h3>
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Language:</strong> {language}
          </p>
          <p>
            <strong>Year:</strong> {publicationYear}
          </p>
          <Link to={`/books/${id}`} className="btn-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookListGrid;
