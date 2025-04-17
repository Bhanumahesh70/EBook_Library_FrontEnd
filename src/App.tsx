import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import BookDetails from './components/EntiyComponents/Books/BookDetails';
import BookForm from './components/EntiyComponents/Books/BookForm';
import Categories from './components/EntiyComponents/Categories/Categories';
import CategoryBooks from './components/EntiyComponents/Categories/CategoryBooks';
import CategoryForm from './components/EntiyComponents/Categories/CategoryForm';
import LoginPage from './components/Authentication/LoginPage';
import UserForm from './components/EntiyComponents/Users/UserForm';
import UsersList from './components/EntiyComponents/Users/UsersList';
import { AuthenticationProvider } from './components/Authentication/AuthenticationContext';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import BookList from './components/EntiyComponents/Books/BookListGrid';
import { LoginUserProvider } from './components/Authentication/LoginUserContext';
import { BooksIdsProvider } from './components/EntiyComponents/AbstractEntity/BooksIdsContext';
import AuthorsList from './components/EntiyComponents/Authors/AuthorsList';
import AddAuthorForm from './components/EntiyComponents/Authors/AuthorForm';
import AuthorDetails from './components/EntiyComponents/Authors/AuthorDetails';
import AuthorBooks from './components/EntiyComponents/Authors/AuthorBooks';
import PublisherDetails from './components/EntiyComponents/Publisher/PublisherDetails';
import PublisherBooks from './components//EntiyComponents/Publisher/PublisherBooks';
import PublisherForm from './components/EntiyComponents/Publisher/PublisherForm';
import PublihsersList from './components/EntiyComponents/Publisher/PublihsersList';
import UserBorrowedBooks from './components/EntiyComponents/Users/UserBorrowedBooks';
import ReservationsList from './components/EntiyComponents/Reservations/ReservationsList';
import BorrowedBooksList from './components/EntiyComponents/BorrowedBooks/BorrowedBooksList';

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
  return (
    <>
      <AuthenticationProvider>
        <LoginUserProvider>
          <BooksIdsProvider>
            <Router>
              <Layout>
                <Routes>
                  {/*public routes*/}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<UserForm isSignup />} />
                  {/*protected routes*/}
                  <Route
                    path="/ebook"
                    element={
                      <ProtectedRoute>
                        <BookList booksProp={[]} isAllbooks={true} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/books"
                    element={
                      <ProtectedRoute>
                        <BookForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/books/:id"
                    element={
                      <ProtectedRoute>
                        <BookDetails />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/ebook/books/:id/edit"
                    element={
                      <ProtectedRoute>
                        <BookForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/categories"
                    element={
                      <ProtectedRoute>
                        <div className="">
                          <Categories />
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/categories/:id/books"
                    element={
                      <ProtectedRoute>
                        <CategoryBooks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/categories/form"
                    element={
                      <ProtectedRoute>
                        <CategoryForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/categories/:id/edit"
                    element={
                      <ProtectedRoute>
                        <CategoryForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/users"
                    element={
                      <ProtectedRoute>
                        <UsersList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/users/form"
                    element={
                      <ProtectedRoute>
                        <UserForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/users/:id"
                    element={
                      <ProtectedRoute>
                        <UserForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/users/:id/books"
                    element={
                      <ProtectedRoute>
                        <UserBorrowedBooks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/authors"
                    element={
                      <ProtectedRoute>
                        <AuthorsList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/authors/:id"
                    element={
                      <ProtectedRoute>
                        <AddAuthorForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/authors/form"
                    element={
                      <ProtectedRoute>
                        <AddAuthorForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/authors/:id/details"
                    element={
                      <ProtectedRoute>
                        <AuthorDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/authors/:id/books"
                    element={
                      <ProtectedRoute>
                        <AuthorBooks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/publishers/form"
                    element={
                      <ProtectedRoute>
                        <PublisherForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/publishers/:id"
                    element={
                      <ProtectedRoute>
                        <PublisherDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/publishers/:id/books"
                    element={
                      <ProtectedRoute>
                        <PublisherBooks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/publishers"
                    element={
                      <ProtectedRoute>
                        <PublihsersList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/reservations"
                    element={
                      <ProtectedRoute>
                        <ReservationsList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ebook/borrowedBooks"
                    element={
                      <ProtectedRoute>
                        <BorrowedBooksList />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Layout>
            </Router>
          </BooksIdsProvider>
        </LoginUserProvider>
      </AuthenticationProvider>
    </>
  );
}

export default App;
