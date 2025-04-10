import React from 'react';

interface NavBarDropDownProps {
  label: string;
  openDropdown: boolean;
  handleDropDownClick: () => void;
  renderDropDownListItems: React.ReactNode;
}
const NavBarDropDown = ({
  label,
  openDropdown,
  handleDropDownClick,
  renderDropDownListItems,
}: NavBarDropDownProps) => {
  return (
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
        {label}
      </a>
      <ul className={`dropdown-menu  ${openDropdown ? 'show' : ''}`}>
        {renderDropDownListItems}
      </ul>
    </li>
  );
};

export default NavBarDropDown;
