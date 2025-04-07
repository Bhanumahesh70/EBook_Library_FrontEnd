import React, { ReactElement } from 'react';

interface InputFields {
  label: string;
  showList: boolean;
  handleShowList: () => void;
  listItems: React.ReactNode;
}
const DropDownList = ({
  label,
  showList,
  handleShowList,
  listItems,
}: InputFields) => {
  return (
    <div className="mb-3">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleShowList}
        >
          {label}
        </button>
        <ul
          className={`dropdown-menu ${showList ? 'show' : ''}`}
          aria-labelledby="dropdownMenuButton"
        >
          {listItems}
        </ul>
      </div>
    </div>
  );
};

export default DropDownList;
