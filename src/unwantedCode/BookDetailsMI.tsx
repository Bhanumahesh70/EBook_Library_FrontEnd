/*

import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Stack,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteBookById, getBooksById } from '../services/bookService';
import { getCategoryById } from '../services/categoryService';
import { getPublisherById } from '../services/publisherService';
import BookImage from '../../assets/Book.jpg';
import { Grid2 } from '@mui/material';

interface Category {
  id: string;
  categoryName: string;
  description: string;
}

type Publisher = {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  bookIds: number[];
};

interface BookDetailsProps {
  id: string;
  title: string;
  author: string;
  language: string;
  publicationYear: string;
  isbn: string;
  totalCopies: string;
  availableCopies: string;
  publisherId: string;
  categoryIds: string[];
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetailsProps | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;

      const bookData = await getBooksById(id);
      setBook(bookData);

      const categoriesData = await Promise.all(
        bookData.categoryIds.map((categoryId: string) =>
          getCategoryById(categoryId)
        )
      );
      setCategories(categoriesData);

      const publisherData = await getPublisherById(bookData.publisherId);
      setPublisher(publisherData);
    };

    fetchBookDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!book) return;
    await deleteBookById(book.id);
    navigate('/ebook');
  };

  if (!book)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Loading book details...
      </Typography>
    );

  return (
    <Grid2 container justifyContent="center" sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 900, boxShadow: 6, borderRadius: 3 }}>
        <Grid2 container>
          
          <Grid2 size={{ xs: 12, md: 4 }}>
            <CardMedia
              component="img"
              image={BookImage}
              alt={book.title}
              sx={{
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px 0 0 8px',
              }}
            />
          </Grid2>

        
          <Grid2 size={{ xs: 12, md: 8 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {book.title}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                by {book.author}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography>
                    <strong>Language:</strong> {book.language}
                  </Typography>
                  <Typography>
                    <strong>Published Year:</strong> {book.publicationYear}
                  </Typography>
                  <Typography>
                    <strong>Publisher:</strong> {publisher?.name}
                  </Typography>
                  <Typography>
                    <strong>ISBN:</strong> {book.isbn}
                  </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Typography>
                    <strong>Genres:</strong>{' '}
                    {categories.map((cat) => cat.categoryName).join(', ')}
                  </Typography>
                  <Typography>
                    <strong>Total Copies:</strong> {book.totalCopies}
                  </Typography>
                  <Typography>
                    <strong>Available Copies:</strong> {book.availableCopies}
                  </Typography>
                </Grid2>
              </Grid2>

             
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  component={Link}
                  to={`/ebook/books/${id}/edit`}
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                >
                  Edit Book
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setOpenDialog(true)}
                >
                  Delete Book
                </Button>
              </Stack>
            </CardContent>
          </Grid2>
        </Grid2>
      </Card>

     
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this book?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};

export default BookDetails;

**/
