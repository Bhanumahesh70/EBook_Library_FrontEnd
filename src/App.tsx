import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getBooks } from './services/bookService';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Book from './components/Books/BookList';
import BookDetails from './components/Books/BookDetails';
import AddBookForm from './components/Books/AddBookForm';
import Categories from './components/Categories/Categories';
import CategoryBooks from './components/Categories/CategoryBooks';
import CategoryForm from './components/Categories/CategoryForm';
import BookListGrid from './components/Books/BookListGrid';
import LoginPage from './components/LoginPage';
import AddUserForm from './components/Users/AddUserForm';
import UsersList from './components/Users/UsersList';

type Book = {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
};
type LayoutProps = {
  children: ReactNode;
};
function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <>
          <Navbar />
          <Header />
        </>
      )}

      {children}
    </>
  );
}
function App() {
  const [books, setBooks] = useState<Book[]>([]);

  function refreshBooks() {
    try {
      getBooks().then((data) => setBooks(data));
      console.log('Books Fetched Sucessfully');
    } catch (error) {
      console.log('Failed to fetch book');
      console.log('error', error);
    }
  }

  useEffect(() => {
    refreshBooks();
  }, []);
  //console.log(books[0].author);

  const bookElements = books.map((book) => {
    return (
      <BookListGrid
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        language={book.language}
        publicationYear={book.publicationYear}
      />
    );
  });
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<AddUserForm isSignup />} />
            <Route
              path="/ebook"
              element={
                <div className="row g-4 justify-content-center m-4 p-4 bookContainer">
                  {bookElements}
                </div>
              }
            />
            <Route
              path="/ebook/books"
              element={<AddBookForm refreshBooks={refreshBooks} />}
            />
            <Route
              path="/ebook/books/:id"
              element={<BookDetails refreshBooks={refreshBooks} />}
            />
            <Route
              path="/ebook/ebook/books/:id/edit"
              element={<AddBookForm refreshBooks={refreshBooks} />}
            />
            <Route
              path="/ebook/categories"
              element={
                <div className="bookContainer">
                  <Categories />
                </div>
              }
            />
            <Route
              path="/ebook/categories/:id/books"
              element={<CategoryBooks />}
            />
            <Route path="/ebook/categories/form" element={<CategoryForm />} />
            <Route
              path="/ebook/categories/:id/edit"
              element={<CategoryForm />}
            />
            <Route path="/ebook/users" element={<UsersList />} />
            <Route path="/ebook/users/form" element={<AddUserForm />} />
            <Route path="/ebook/users/:id" element={<AddUserForm />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
