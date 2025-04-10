import React from 'react';
import Card from '../../Form/Card';
import {
  getAuthorById,
  deleteAuthorById,
} from '../../../services/EntityServices/authorService';
import AuthorImage from '../../../assets/Author.jpeg';
import { Author } from '../../../services/types';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../Authentication/RoleContext';

function AuthorDetails() {
  const [author, setAuthor] = React.useState<Author | null>(null);
  const navigate = useNavigate();
  const { role } = useRole();

  function viewBooks() {
    console.log('Navigating with author name:', author?.name);
    navigate(`/ebook/authors/${author?.id}/books`, {
      state: { authorName: author?.name },
    });
  }
  const authorDetails = () => {
    return [
      { label: 'Bio', value: author?.bio },
      { label: 'Birth Date', value: author?.birthDate },
    ];
  };
  return (
    <Card
      image={AuthorImage}
      alt="Author"
      title={author?.name}
      subtitle={author?.nationality}
      getEnityById={getAuthorById}
      deleteEntityById={deleteAuthorById}
      entityName="Author"
      customButtonText={'Books'}
      customButtonClickAction={viewBooks}
      details={authorDetails()}
      onEntityLoad={setAuthor}
      includeEditButton={role === `ROLE_ADMIN`}
      editClickUrl={`/ebook/authors/form`}
    />
  );
}

export default AuthorDetails;
