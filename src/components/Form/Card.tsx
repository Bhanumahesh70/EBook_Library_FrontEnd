import React from 'react';
import Modal from '../Modals/Modal';
import FeedBackModal from '../Modals/FeedBackModal';
import { Link, useParams, useNavigate } from 'react-router-dom';
interface CardProps<T> {
  image: string;
  alt: string;
  title: string | undefined;
  subtitle?: string | React.ReactNode;
  details: { label: string; value: string | React.ReactNode }[];
  getEnityById: (id: string | undefined) => Promise<T>;
  deleteEntityById: (id: string) => Promise<void>;
  entityName: string;
  navigateAwayUrl?: string;
  includeDeleteButton?: Boolean;
  includeEditButton?: Boolean;
  editClickUrl?: string;
  customButtonText?: string;
  customButtonClickAction?: () => void;
  onEntityLoad?: (entity: T) => void;
}
const Card = <T,>({
  image,
  alt,
  title,
  subtitle,
  details,
  getEnityById,
  deleteEntityById,
  navigateAwayUrl,
  entityName,
  includeDeleteButton,
  includeEditButton,
  editClickUrl,
  customButtonText,
  customButtonClickAction,
  onEntityLoad,
}: CardProps<T>) => {
  const { id } = useParams<{ id: string }>();
  console.log('Displaying book with id:', id);
  const [entity, setEntity] = React.useState<T | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showFeedbackModal, setShowFeedbackModel] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  const fetchEntityDetails = async () => {
    if (!id) {
      console.log('Not id returning.....', id);
      return;
    }
    const entityData = await getEnityById(id);
    setEntity(entityData);
    if (onEntityLoad) {
      onEntityLoad(entityData);
    }
    console.log(`${entityName} is fetched: `, entityData);
  };

  React.useEffect(() => {
    fetchEntityDetails();
  }, [id]);

  function handleEditButtonClick() {
    if (editClickUrl) navigate(editClickUrl);
  }
  function confirmDelete() {
    setShowModal(true);
  }
  async function deleteEntity(id: string | undefined) {
    try {
      if (id) {
        await deleteEntityById(id);
      }
      setIsError(false);
    } catch (error) {
      console.log(`Error deleting ${entityName}`, error);
      setIsError(true);
    } finally {
      setShowModal(false);
      setShowFeedbackModel(true);
    }
  }
  function handleCloseFeedbackModel() {
    setShowFeedbackModel(false);
    if (!isError && navigateAwayUrl) navigate(navigateAwayUrl);
  }
  function displayTextInFeedbackModel() {
    return isError
      ? `Error in deleting ${entityName}`
      : `${entityName} deleted successfully`;
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  if (!entity)
    return (
      <p className="text-center mt-5">`Loading ${entityName} details...`</p>
    );
  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="row g-0">
            {/* Image */}
            <div className="col-md-4">
              <img src={image} className="img-fluid rounded-start" alt={alt} />
            </div>

            {/*Details */}
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {subtitle && <h5 className="text-muted">{subtitle}</h5>}
                <hr />

                {details.map((item) => (
                  <p key={item.label}>
                    <strong>{item.label}</strong> {item.value}
                  </p>
                ))}
                <div className="d-flex gap-3 mt-4">
                  {customButtonText && customButtonClickAction && (
                    <button
                      className="btn btn-primary"
                      onClick={customButtonClickAction}
                    >
                      <i className="bi bi-trash">{customButtonText}</i>
                    </button>
                  )}
                  {includeEditButton && (
                    <button
                      className="btn btn-primary"
                      onClick={handleEditButtonClick}
                    >
                      <i className="bi bi-pencil-square">Edit {entityName}</i>
                    </button>
                  )}
                  {includeDeleteButton && (
                    <button className="btn btn-danger" onClick={confirmDelete}>
                      <i className="bi bi-trash">Delete</i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <Modal
        showModal={showModal}
        close={handleCloseModal}
        submit={() => deleteEntity(id)}
      />
      <FeedBackModal
        showFeedBackModal={showFeedbackModal}
        displayTextInFeedbackModal={displayTextInFeedbackModel}
        close={handleCloseFeedbackModel}
      />
    </>
  );
};

export default Card;
