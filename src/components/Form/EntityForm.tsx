import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import FeedBackModal from '../Modals/FeedBackModal';
import { textInModal, handleModalClosing } from '../../services/modalUtilities';
import {
  handleFormSubmit,
  handleInputOnChange,
} from '../../services/formUtilities';
import { Form } from 'react-bootstrap';
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
  customNavigateUrl?: string;
  customTextForModal?: string;
  uploadImage?: (formdata: FormData, id: string) => void;
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
  customNavigateUrl,
  customTextForModal,
  uploadImage,
}: EntityFormProps<T>) {
  const [entity, setEntity] = React.useState<T>(defaultEntity);
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const { id } = useParams();
  const isEditing = Boolean(id);
  const location = useLocation();
  const navigate = useNavigate();
  //const [showModal, setShowModal] = React.useState(false);
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
      onAfterSubmit,
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
    return textInModal({
      isError,
      isEditing,
      entityName,
      customText: customTextForModal,
    });
  }
  function handleCloseFeedBackModal() {
    handleModalClosing<T>({
      setShowModal: setShowFeedbackModel,
      isError,
      isEditing,
      url: urlToNavitageAwayFromForm,
      setEntity,
      entity: defaultEntity,
      navigate,
      customNavigateUrl,
    });
  }
  const uploadCoverImage = async (id: string) => {
    if (uploadImage) {
      console.log('Uploading cover Image');
      if (!coverImage) return;
      const formData = new FormData();
      formData.append('file', coverImage);
      await uploadImage(formData, id);
    }
  };
  const onAfterSubmit = async (entity: T, submittedId?: string) => {
    const realId = submittedId || (entity as any).id;
    if (uploadImage && realId) {
      console.log('Uploading image after form submit...');
      await uploadCoverImage(realId);
    }
  };
  return (
    <div className="formHeader form-wrapper">
      {customFormHeading ? (
        customFormHeading()
      ) : (
        <h1>{isEditing ? `Edit ${entityName}` : `Add New ${entityName}`}</h1>
      )}
      <div className="container mb-5 formContainer">
        <form className="entityform" onSubmit={handleSubmit}>
          {/* Render all form feilds */}
          {renderFields(entity, handleChange)}
          <>
            {/* Render form to upload image */}
            {uploadImage && (
              <Form.Group controlId="formCoverImage" className="mb-3">
                <Form.Label>Upload Cover Image</Form.Label>
                <div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const file = target.files?.[0];
                      setCoverImage(file || null);
                      setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                    className="custom-file-input-blue"
                  />
                </div>
              </Form.Group>
            )}
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '5px',
                  }}
                />
              </div>
            )}
          </>
          {/*Form submit button*/}
          <div className="mb-3 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        {/*Feedback modal for form submission*/}
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
