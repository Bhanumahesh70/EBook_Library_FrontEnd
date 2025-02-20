import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getBooks } from "./services/bookService";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Book from "./components/BookList";
function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);
  console.log(books[0].author);

  const bookElements = books.map((book) => {
    return (
      <Book
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.title}
        language={book.language}
        pusblished_year={book.publicationYear}
      />
    );
  });
  return (
    <>
      <Navbar />
      <Header />
      <div className="bookContainer">{bookElements}</div>
    </>
  );
}

export default App;
