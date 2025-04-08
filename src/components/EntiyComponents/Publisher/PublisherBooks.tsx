import { getBooksForPublisherWithId } from '../../../services/EntityServices/publisherService';
import EntityBooks from '../AbstractEntity/EntityBooks';
const PublisherBooks = () => {
  return (
    <EntityBooks
      keyName="publisherName"
      entityType="Publisher"
      fetchBooks={getBooksForPublisherWithId}
    />
  );
};

export default PublisherBooks;
