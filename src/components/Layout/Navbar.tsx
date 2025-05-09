import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../Authentication/AuthenticationContext';
import { useLoginUser } from '../Authentication/LoginUserContext';
import NavBarDropDown from '../Form/NavBarDropDown';
import { useGlobalSearch } from '../Utilities/GlobalSearchContext';
const Navbar = () => {
  const [openNavButton, setOpenNavButton] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const { setIsAuthenticated } = useAuthentication();
  const { loginUserDetails } = useLoginUser();
  const role = loginUserDetails.role;
  const navigate = useNavigate();
  const { globalSearch, setGlobalSearch } = useGlobalSearch();

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
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
            className={`collapse navbar-collapse ${
              openNavButton ? 'show' : ''
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link to={`/ebook`} className="nav-link">
                  Home
                </Link>
              </li>

              {role === 'ROLE_ADMIN' ? (
                <>
                  <NavBarDropDown
                    label="Books"
                    openDropdown={openDropdown === 'Books'}
                    handleDropDownClick={() => handleDropDownClick('Books')}
                    renderDropDownListItems={booksDropdownList()}
                  />
                  <NavBarDropDown
                    label="Authors"
                    openDropdown={openDropdown === 'Authors'}
                    handleDropDownClick={() => handleDropDownClick('Authors')}
                    renderDropDownListItems={authorsDropdownList()}
                  />
                  <NavBarDropDown
                    label="Category"
                    openDropdown={openDropdown === 'Category'}
                    handleDropDownClick={() => handleDropDownClick('Category')}
                    renderDropDownListItems={categoriesDropdownList()}
                  />
                  <NavBarDropDown
                    label="Publishers"
                    openDropdown={openDropdown === 'Publishers'}
                    handleDropDownClick={() =>
                      handleDropDownClick('Publishers')
                    }
                    renderDropDownListItems={publishersDropdownList()}
                  />
                  <NavBarDropDown
                    label="Users"
                    openDropdown={openDropdown === 'Users'}
                    handleDropDownClick={() => handleDropDownClick('Users')}
                    renderDropDownListItems={usersDropdownList()}
                  />
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={`/ebook/authors`} className="nav-link">
                      Authors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/ebook/categories`} className="nav-link">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/ebook/publishers`} className="nav-link">
                      Publishers
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link
                  to={
                    role === 'ROLE_ADMIN'
                      ? `/ebook/reservations`
                      : `/ebook/users/${loginUserDetails.id}/reservations`
                  }
                  className="nav-link"
                >
                  Reservations
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={
                    role === 'ROLE_ADMIN'
                      ? `/ebook/borrowedBooks`
                      : `/ebook/users/${loginUserDetails.id}/books`
                  }
                  className="nav-link"
                >
                  Borrowed Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={
                    role === 'ROLE_ADMIN'
                      ? `/ebook/fines`
                      : `/ebook/users/${loginUserDetails.id}/fines`
                  }
                  className="nav-link"
                >
                  Fines
                </Link>
              </li>
            </ul>

            {/* Right-aligned Logout and Search */}
            <div className="d-flex flex-wrap gap-2 justify-content-end w-100 mt-3 mt-md-0">
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
              <form
                className="d-flex flex-grow-1 flex-md-grow-0"
                role="search"
                style={{ gap: '8px', maxWidth: '300px', width: '100%' }}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search anything"
                  aria-label="Search"
                  style={{ flexGrow: 1 }}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
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
