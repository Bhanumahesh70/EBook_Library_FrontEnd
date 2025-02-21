import React from 'react';
interface Props {
  showFeedBackModal: boolean;
  displayTextInFeedbackModal: () => string;
  close: () => void;
}
const FeedBackModal = ({
  showFeedBackModal,
  displayTextInFeedbackModal,
  close,
}: Props) => {
  return (
    <div
      className={`modal fade ${showFeedBackModal ? 'show' : ''}`}
      style={{ display: showFeedBackModal ? 'block' : 'none' }}
      id="exampleModal"
      tabIndex={1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">{displayTextInFeedbackModal()}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => close()}
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
