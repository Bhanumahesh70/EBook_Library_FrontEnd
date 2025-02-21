import React from 'react';
interface Props {
  showModal: boolean;
  displayTextInModal: () => string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const FeedBackModal = ({
  showModal,
  displayTextInModal,
  setShowModal,
}: Props) => {
  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      style={{ display: showModal ? 'block' : 'none' }}
      id="exampleModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{displayTextInModal()}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackModal;
