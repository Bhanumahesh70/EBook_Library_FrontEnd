import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [openNavButton, setOpenNavButton] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  function handleDropDownClick() {
    setOpenDropdown((prev) => !prev);
  }
  function handleNavButtonClick() {
    setOpenNavButton((prev) => !prev);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
        <div className="container">
          <a className="navbar-brand" href="#">
            EBook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleNavButtonClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse  ${
              openNavButton ? 'show' : ''
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto ">
              <li className="nav-item active">
                <Link to={`/`} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/books`} className="nav-link">
                  {' '}
                  Add Book
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/categories`} className="nav-link">
                  {' '}
                  Categories
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleDropDownClick}
                >
                  Admin
                </a>
                <ul className={`dropdown-menu  ${openDropdown ? 'show' : ''}`}>
                  <li>
                    <Link
                      to={`/categories/form`}
                      className="dropdown-item"
                      onClick={handleDropDownClick}
                    >
                      Add Category
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
            <div className="ms-auto">
              <form className="form-inline my-2 my-lg-0 d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
