import React from 'react';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  submit: () => void;
}

const Modal = ({ showModal, setShowModal, submit }: Props) => {
  return (
    <div
      className={showModal ? 'modal fade show' : 'modal fade'}
      style={showModal ? { display: 'block' } : {}}
      id="exampleModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Confirmation
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Are you sure you want to delete</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
