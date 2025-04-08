import EntityBooks from '../AbstractEntity/EntityBooks';

import { getBooksForAuthorWithId } from '../../../services/EntityServices/authorService';

const AuthorBooks = () => {
  return (
    <EntityBooks
      keyName="authorName"
      entityType="Author"
      fetchBooks={getBooksForAuthorWithId}
    />
  );
};

export default AuthorBooks;
