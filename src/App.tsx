import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getBooks } from './services/bookService';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Book from './components/BookList';
import BookDetails from './components/BookDetails';

type Book = {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
};
function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);
  //console.log(books[0].author);

  const bookElements = books.map((book) => {
    return (
      <Book
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        language={book.language}
        pusblished_year={book.publicationYear}
      />
    );
  });
  return (
    <>
      <Navbar />
      <Header />
      <Router>
        <Routes>
          <Route
            path='/'
            element={<div className='bookContainer'>{bookElements}</div>}
          />
          <Route path='/books/:id' element={<BookDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
