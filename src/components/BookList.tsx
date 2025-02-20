import React from "react";

interface bookProps {
  id: string;
  title: string;
  author: string;
  language: string;
  pusblished_year: string;
}
function BookList(books: bookProps) {
  return (
    <div className="card bookCard" style={{ width: "18rem" }}>
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Titile:</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Author: {books.author}</li>
        <li className="list-group-item">Language:{books.language}</li>
        <li className="list-group-item">
          {" "}
          Published Year:{books.pusblished_year}
        </li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
}

export default BookList;
