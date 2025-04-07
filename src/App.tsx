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
import BookDetails from './components/Books/BookDetails';
import AddBookForm from './components/Books/BookForm';
import Categories from './components/Categories/Categories';
import CategoryBooks from './components/Categories/CategoryBooks';
import CategoryForm from './components/Categories/CategoryForm';
import LoginPage from './components/Authentication/LoginPage';
import UserForm from './components/Users/UserForm';
import UsersList from './components/Users/UsersList';
import { AuthenticationProvider } from './components/Authentication/AuthenticationContext';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import BookList from './components/Books/BookListGrid';
import { RoleProvider } from './components/Authentication/RoleContext';
import AuthorsList from './components/Authors/AuthorsList';
import AddAuthorForm from './components/Authors/AuthorForm';
import AuthorDetails from './components/Authors/AuthorDetails';
import AuthorBooks from './components/Authors/AuthorBooks';
import PublisherDetails from './components/Publisher/PublisherDetails';
import PublisherBooks from './components/Publisher/PublisherBooks';

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
        <RoleProvider>
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
                      <AddBookForm />
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
                      <AddBookForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ebook/categories"
                  element={
                    <ProtectedRoute>
                      <div className="bookContainer">
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
              </Routes>
            </Layout>
          </Router>
        </RoleProvider>
      </AuthenticationProvider>
    </>
  );
}

export default App;
