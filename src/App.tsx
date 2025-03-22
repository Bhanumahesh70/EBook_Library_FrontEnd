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
import AddBookForm from './components/Books/AddBookForm';
import Categories from './components/Categories/Categories';
import CategoryBooks from './components/Categories/CategoryBooks';
import CategoryForm from './components/Categories/CategoryForm';
import LoginPage from './components/Authentication/LoginPage';
import AddUserForm from './components/Users/AddUserForm';
import UsersList from './components/Users/UsersList';
import { AuthenticationProvider } from './components/Authentication/AuthenticationContext';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import BookList from './components/Books/BookListGrid';

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
        <Router>
          <Layout>
            <Routes>
              {/*public routes*/}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<AddUserForm isSignup />} />
              {/*protected routes*/}
              <Route
                path="/ebook"
                element={
                  <ProtectedRoute>
                    <div className="row g-4 justify-content-center m-4 p-4 bookContainer">
                      <BookList />
                    </div>
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
                    <AddUserForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ebook/users/:id"
                element={
                  <ProtectedRoute>
                    <AddUserForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AuthenticationProvider>
    </>
  );
}

export default App;
