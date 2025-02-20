import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Book from "./components/BookList";
function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="bookContainer">
        <Book />
      </div>
    </>
  );
}

export default App;
