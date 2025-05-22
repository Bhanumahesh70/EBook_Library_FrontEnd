import React from 'react';
import Card from '../../Form/Card';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  deleteBookById,
  getBooksById,
} from '../../../services/EntityServices/bookService';
import Modal from '../../Modals/Modal';
import FeedBackModal from '../../Modals/FeedBackModal';
import BookImage from '../../../assets/Book.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Book,
  AuthorsDetails,
  CategoriesDetails,
  PublisherDetails,
} from '../../../services/types';
import { useLoginUser } from '../../Authentication/LoginUserContext';

function BookDetails() {
  const [book, setBook] = React.useState<Book | null>(null);
  const navigate = useNavigate();
  const { loginUserDetails } = useLoginUser();
  const role = loginUserDetails.role;
  const categoryElements = (categories: CategoriesDetails[] | undefined) => {
    if (!categories) {
      return;
    }
    return categories.map((category) => (
      <p key={category.categoryName} style={{ display: 'inline' }}>
        <Link
          className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          to={`/ebook/categories/${category.id}/books`}
          state={{ categoryName: category.categoryName }}
        >
          {category.categoryName}{' '}
        </Link>
      </p>
    ));
  };
  const authorElements = (authors: AuthorsDetails[] | undefined) => {
    if (!authors) {
      return;
    }
    return authors.map((author, index) => (
      <span key={author.id || index}>
        <Link
          className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          to={`/ebook/authors/${author.id}`}
        >
          {author.name}
        </Link>

        {index < authors.length - 1 ? ', ' : ''}
      </span>
    ));
  };

  const publisherElement = (publisher: PublisherDetails | undefined) => {
    return (
      <Link
        className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        to={`/ebook/publishers/${publisher?.id}`}
      >
        {publisher?.name}
      </Link>
    );
  };

  const BookDetails = (book: Book | null) => {
    return [
      { label: 'Language', value: book?.language },
      { label: 'Published Year', value: book?.publicationYear },
      { label: 'Publisher', value: publisherElement(book?.publisherDetails) },
      { label: 'ISBN', value: book?.isbn },
      { label: 'Genere', value: categoryElements(book?.categoriesDetails) },
      { label: 'Total Copies', value: book?.totalCopies },
      { label: 'Available Copies', value: book?.availableCopies },
    ];
  };

  return (
    <Card
      image={book?.coverImageUrl || BookImage}
      alt={`${book?.title}`}
      title={book?.title}
      subtitle={
        <>
          <strong>By: </strong>
          {authorElements(book?.authorsDetails)}
        </>
      }
      getEnityById={getBooksById}
      deleteEntityById={deleteBookById}
      entityName="Book"
      includeEditButton={role === `ROLE_ADMIN`}
      editClickUrl={`/ebook/books/${book?.id}/edit`}
      includeDeleteButton={role === `ROLE_ADMIN`}
      details={BookDetails(book)}
      onEntityLoad={setBook}
    />
  );
}

export default BookDetails;
