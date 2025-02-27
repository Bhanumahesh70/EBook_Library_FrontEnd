import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getBooks } from './services/bookService';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Book from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBookForm from './components/AddBookForm';
import Categories from './components/Categories';
import CategoryBooks from './components/CategoryBooks';
import CategoryForm from './components/CategoryForm';
import BookListGrid from './components/BookListGrid';

type Book = {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
};
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
        <Navbar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<div className="bookContainer">{bookElements}</div>}
          />
          <Route
            path="/books"
            element={<AddBookForm refreshBooks={refreshBooks} />}
          />
          <Route
            path="/books/:id"
            element={<BookDetails refreshBooks={refreshBooks} />}
          />
          <Route
            path="/books/:id/edit"
            element={<AddBookForm refreshBooks={refreshBooks} />}
          />
          <Route
            path="/categories"
            element={
              <div className="bookContainer">
                <Categories />
              </div>
            }
          />
          <Route path="/categories/:id/books" element={<CategoryBooks />} />
          <Route path="/categories/form" element={<CategoryForm />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
