import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import { textInModal, handleModalClosing } from '../../services/modalUtilities';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../../services/formUtilities';

interface EntityFormProps<T> {
  defaultEntity: T;
  getEntityById: (id: string | undefined) => Promise<T>;
  entityName: string;
  updateEntity: (id: string | undefined, entity: T) => Promise<T>;
  addEntity: (entity: T) => Promise<T>;
  urlToNavitageAwayFromForm: string;
  renderFields: (
    entity: T,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => React.ReactNode;
  customHandleChange?: (
    e: React.ChangeEvent<any>,
    setEntity: React.Dispatch<React.SetStateAction<T>>
  ) => void;
  customFormHeading?: () => React.ReactNode;
  customUseEffect?: (
    id: string | undefined,
    setEntity: React.Dispatch<React.SetStateAction<T>>
  ) => void;
}
function EntityForm<T>({
  defaultEntity,
  getEntityById,
  entityName,
  updateEntity,
  addEntity,
  urlToNavitageAwayFromForm,
  renderFields,
  customHandleChange,
  customFormHeading,
  customUseEffect,
}: EntityFormProps<T>) {
  const [entity, setEntity] = React.useState<T>(defaultEntity);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (customUseEffect) {
      customUseEffect(id, setEntity);
    } else {
      if (isEditing) {
        getEntityById(id).then((data) => setEntity(data));
      } else {
        setEntity(defaultEntity);
      }
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmit<T>({
      e,
      isEditing,
      entity,
      id,
      updateFunction: updateEntity,
      addFunction: addEntity,
      entityName,
      setIsError,
      setShowModal: setShowFeedbackModel,
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (customHandleChange) {
      customHandleChange(e, setEntity);
    } else {
      handleInputOnChange<T>(e, setEntity);
    }
  }
  function displayTextInModal() {
    return textInModal({ isError, isEditing, entityName });
  }
  function handleCloseFeedBackModal() {
    handleModalClosing<T>({
      setShowModal,
      isError,
      isEditing,
      url: urlToNavitageAwayFromForm,
      setEntity,
      entity: defaultEntity,
      navigate,
    });
  }
  return (
    <div className="formHeader">
      {customFormHeading ? (
        customFormHeading()
      ) : (
        <h1>{isEditing ? `Edit ${entityName}` : `Add New ${entityName}`}</h1>
      )}
      <div className="container mb-5 formContainer">
        <form className="entityform" onSubmit={handleSubmit}>
          {renderFields(entity, handleChange)}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <FeedBackModal
          showFeedBackModal={showFeedbackModal}
          displayTextInFeedbackModal={displayTextInModal}
          close={handleCloseFeedBackModal}
        />
      </div>
    </div>
  );
}
export default EntityForm;
