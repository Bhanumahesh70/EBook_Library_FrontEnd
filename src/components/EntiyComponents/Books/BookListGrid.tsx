import React from 'react';
import { Link } from 'react-router-dom';
import BookImage from '../../../assets/Book.jpg';
import { getBooks } from '../../../services/EntityServices/bookService';
import {
  Book,
  AuthorsDetails,
  Reservation,
  User,
} from '../../../services/types';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addReservation } from '../../../services/EntityServices/reservationService';
import { useLoginUser } from '../../Authentication/LoginUserContext';
import { useGlobalSearch } from '../../Utilities/GlobalSearchContext';
import { getUserById } from '../../../services/EntityServices/userService';
interface BooksProp {
  booksProp: Book[];
  isAllbooks: boolean;
}

function BookList({ booksProp, isAllbooks }: BooksProp) {
  const [books, setBooks] = React.useState<Book[]>(booksProp || []);
  const [user, setUser] = React.useState<User>();
  const { loginUserDetails } = useLoginUser();
  const defaultReservation: Reservation = {
    id: '',
    reservationDate: new Date(),
    status: 'REQUESTED',
    numberOfDays: '',
    userDetails: {
      id: loginUserDetails.id,
      name: '',
    },
    bookDetails: {
      id: '',
      title: '',
    },
  };
  const [reservation, setReservation] =
    React.useState<Reservation>(defaultReservation);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [cost, setCost] = React.useState(0);
  const { globalSearch } = useGlobalSearch();

  console.log('booksProp:', booksProp);
  console.log('Books:', books);

  const refreshBooks = async () => {
    console.log('Refreshing books...');
    const books = await getBooks();
    setBooks(books);
    const booksIds = books.map((book) => book.id);
    // setBooksIds(booksDetails);
    console.log('booksIds:', booksIds);
    return books;
  };
  const fetchUser = async <User,>() => {
    const userdata = await getUserById(loginUserDetails.id);
    console.log('Userdata is fetched :', userdata);
    setUser(userdata);
  };
  React.useEffect(() => {
    console.log('Inside useEffect. booksprop.length:', booksProp.length);
    console.log('isAllBooks:', isAllbooks);
    if (!isAllbooks) {
      setBooks(booksProp);
    } else {
      refreshBooks();
    }
    fetchUser();
  }, [booksProp]);

  const globallyFilteredData = books.filter((book) => {
    return (
      book.title.toLocaleLowerCase().includes(globalSearch.toLowerCase()) ||
      book.authorsDetails.some((author) =>
        author.name.toLocaleLowerCase().includes(globalSearch.toLowerCase())
      ) ||
      book.language.toLocaleLowerCase().includes(globalSearch.toLowerCase()) ||
      book.publisherDetails.name
        .toLocaleLowerCase()
        .includes(globalSearch.toLowerCase())
    );
  });
  const authorElements = (authorsDetails: AuthorsDetails[]) => {
    return authorsDetails.map(
      (authorDetail, index) =>
        ` ${authorDetail.name}${index < authorsDetails.length - 1 ? ',' : ''}`
    );
  };

  const handleReserveClick = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
    setReservation((prev) => ({
      ...prev,
      bookDetails: {
        id: book.id,
        title: book.title,
      },
    }));
  };

  const handleConfirmReservation = async () => {
    setShowModal(false);
    console.log('Creating a new reservation: ', reservation);
    await addReservation(reservation);
    await fetchUser();
  };

  const calculateCost = (days: number) => {
    return days > 30 ? days - 30 : 0;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setReservation(defaultReservation);
    setCost(0);
  };
  const displayReservationText = (
    reservationStatus: string | null,
    borrowStatus: string | null
  ) => {
    if (borrowStatus === 'BORROWED' || borrowStatus === 'LATE') {
      return borrowStatus === 'BORROWED' ? 'Borrowed' : 'Late';
    }

    if (reservationStatus === 'REQUESTED') {
      return 'Requested';
    }
    if (reservationStatus === 'APPROVED') {
      if (borrowStatus !== null) {
        return borrowStatus === 'RETURNED' ? 'Reserve' : 'Approved';
      }
      return 'Approved';
    }

    return 'Reserve';
  };

  const reservebuttonDisablement = (
    reservationStatus: string | null,
    borrowStatus: string | null
  ) => {
    // Block if book is still borrowed or overdue
    if (borrowStatus === 'BORROWED' || borrowStatus === 'LATE') {
      return true;
    }

    // Block if there's a pending reservation (requested or approved),
    // and no latest borrow with status RETURNED
    if (reservationStatus === 'REQUESTED') {
      return true;
    }
    if (reservationStatus === 'APPROVED') {
      if (borrowStatus !== null) {
        return borrowStatus === 'RETURNED' ? false : true;
      }
      return true;
    }

    return false;
  };

  const getBookReservationStatus = (book: Book): string | null => {
    if (!user?.reservationDetails) return null;

    const reservations = user.reservationDetails
      .filter((r) => r.bookId === book.id)
      .sort(
        (a, b) =>
          new Date(b.reservationDate).getTime() -
          new Date(a.reservationDate).getTime()
      );

    const latestReservation = reservations[0];
    return latestReservation ? latestReservation.status : null;
  };

  const getBookBorrowStatus = (book: Book): string | null => {
    if (!user?.borrowedBookDetails) return null;

    const thisBorrowedBooks = user.borrowedBookDetails
      .filter((b) => b.bookId === book.id)
      .sort(
        (a, b) =>
          new Date(b.borrowedDate).getTime() -
          new Date(a.borrowedDate).getTime()
      );

    const latestBorrowedBookDetails = thisBorrowedBooks[0];
    return latestBorrowedBookDetails ? latestBorrowedBookDetails.status : null;
  };

  return (
    <div className="row g-4 justify-content-center m-4 p-4 bookContainer">
      {' '}
      {globallyFilteredData.map((book) => (
        <div className="col-7 col-sm-5 col-md-4 col-lg-3" key={book.id}>
          <div className="card shadow-lg h-100 border-0 book-card">
            <img
              src={BookImage}
              className="card-img-top book-img"
              alt={book.title}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text text-muted">Book by:</p>
              <p className="card-text text-muted">
                <strong>{authorElements(book.authorsDetails)}</strong>.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Author:</strong> {authorElements(book.authorsDetails)}
              </li>
              <li className="list-group-item">
                <strong>Language:</strong> {book.language}
              </li>
              <li className="list-group-item">
                <strong>Publisher: </strong> {book.publisherDetails.name}
              </li>
            </ul>
            <div className="card-body text-center cardButtonsContainer">
              <Link
                to={`/ebook/books/${book.id}`}
                className="btn btn-primary cardButton"
              >
                <i className="bi bi-eye"></i> View Details
              </Link>

              <button
                className="btn btn-primary cardButton"
                onClick={() => handleReserveClick(book)}
                disabled={reservebuttonDisablement(
                  getBookReservationStatus(book),
                  getBookBorrowStatus(book)
                )}
              >
                {displayReservationText(
                  getBookReservationStatus(book),
                  getBookBorrowStatus(book)
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reserve: {selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Author:</strong>{' '}
            {authorElements(selectedBook?.authorsDetails || [])}
          </p>
          <p>
            <strong>Language:</strong> {selectedBook?.language}
          </p>

          <Form.Group>
            <Form.Label>Reservation Start Date</Form.Label>
            <DatePicker
              selected={
                reservation.reservationDate ? reservation.reservationDate : null
              }
              onChange={(date: Date | null) =>
                setReservation((prev) => ({
                  ...prev,
                  reservationDate: date || new Date(),
                }))
              }
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select a start date"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Number of Days</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={reservation.numberOfDays}
              onChange={(e) => {
                setReservation((prev) => ({
                  ...prev,
                  numberOfDays: e.target.value,
                }));
                setCost(calculateCost(Number(e.target.value)));
              }}
            />
          </Form.Group>

          <div className="mt-3">
            <strong>Total Cost:</strong> ${cost}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmReservation}>
            Confirm Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookList;
