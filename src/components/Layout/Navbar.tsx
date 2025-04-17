import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../Authentication/AuthenticationContext';
import { useLoginUser } from '../Authentication/LoginUserContext';
import NavBarDropDown from '../Form/NavBarDropDown';
const Navbar = () => {
  const [openNavButton, setOpenNavButton] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const { setIsAuthenticated } = useAuthentication();
  const { loginUserDetails } = useLoginUser();
  const role = loginUserDetails.role;
  const navigate = useNavigate();

  function handleDropDownClick(name: string) {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }

  function handleNavButtonClick() {
    setOpenNavButton((prev) => !prev);
  }
  function logout() {
    setIsAuthenticated(false);
  }
  console.log(`role is : ${loginUserDetails.role}`);

  const entityDropDownList = (
    entityName: string,
    viewUrl: string,
    formUrl: string
  ) => {
    return (
      <>
        <li>
          <Link
            to={viewUrl}
            className="dropdown-item"
            onClick={() => handleDropDownClick('entityName')}
          >
            View {entityName}
          </Link>
        </li>
        <li>
          <Link
            to={formUrl}
            className="dropdown-item"
            onClick={() => handleDropDownClick('entityName')}
          >
            Add {entityName}
          </Link>
        </li>
      </>
    );
  };
  const booksDropdownList = () => {
    return entityDropDownList('Books', `/ebook`, `/ebook/books`);
  };
  const categoriesDropdownList = () => {
    return entityDropDownList(
      'Category',
      `/ebook/categories`,
      `/ebook/categories/form`
    );
  };
  const publishersDropdownList = () => {
    return entityDropDownList(
      'Publishers',
      `/ebook/publishers`,
      `/ebook/publishers/form`
    );
  };
  const authorsDropdownList = () => {
    return entityDropDownList(
      'Authors',
      `/ebook/authors`,
      `/ebook/authors/form`
    );
  };
  const usersDropdownList = () => {
    return entityDropDownList('Users', `/ebook/users`, `/ebook/users/form`);
  };
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
                <Link to={`/ebook`} className="nav-link">
                  Home
                </Link>
              </li>
              {role === 'ROLE_ADMIN' ? (
                <NavBarDropDown
                  label="Books"
                  openDropdown={openDropdown === 'Books'}
                  handleDropDownClick={() => handleDropDownClick('Books')}
                  renderDropDownListItems={booksDropdownList()}
                />
              ) : (
                <></>
              )}
              {role === 'ROLE_ADMIN' ? (
                <NavBarDropDown
                  label="Authors"
                  openDropdown={openDropdown === 'Authors'}
                  handleDropDownClick={() => handleDropDownClick('Authors')}
                  renderDropDownListItems={authorsDropdownList()}
                />
              ) : (
                <li className="nav-item">
                  <Link to={`/ebook/authors`} className="nav-link">
                    Authors
                  </Link>
                </li>
              )}
              {role === 'ROLE_ADMIN' ? (
                <NavBarDropDown
                  label="Category"
                  openDropdown={openDropdown === 'Category'}
                  handleDropDownClick={() => handleDropDownClick('Category')}
                  renderDropDownListItems={categoriesDropdownList()}
                />
              ) : (
                <li className="nav-item">
                  <Link to={`/ebook/categories`} className="nav-link">
                    Categories
                  </Link>
                </li>
              )}
              {role === 'ROLE_ADMIN' ? (
                <NavBarDropDown
                  label="Publishers"
                  openDropdown={openDropdown === 'Publishers'}
                  handleDropDownClick={() => handleDropDownClick('Publishers')}
                  renderDropDownListItems={publishersDropdownList()}
                />
              ) : (
                <li className="nav-item">
                  <Link to={`/ebook/publishers`} className="nav-link">
                    Publishers
                  </Link>
                </li>
              )}
              {role === 'ROLE_ADMIN' ? (
                <NavBarDropDown
                  label="Users"
                  openDropdown={openDropdown === 'Users'}
                  handleDropDownClick={() => handleDropDownClick('Users')}
                  renderDropDownListItems={usersDropdownList()}
                />
              ) : (
                <></>
              )}
              {role === 'ROLE_ADMIN' ? (
                <li className="nav-item">
                  <Link to={`/ebook/reservations`} className="nav-link">
                    Reservations
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {role === 'ROLE_ADMIN' ? (
                <li className="nav-item">
                  <Link to={`/ebook/borrowedBooks`} className="nav-link">
                    Borrowed Books
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  onClick={logout}
                >
                  Logout
                </button>
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
