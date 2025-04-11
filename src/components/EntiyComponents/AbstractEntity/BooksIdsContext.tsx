import React, { useContext, ReactNode } from 'react';
import { BookDetails } from '../../../services/types';

interface BooksIdsProps {
  booksDetails: BookDetails[];
  //booksIds: string[];
  setBooksIds: React.Dispatch<React.SetStateAction<BookDetails[]>>;
}
interface Props {
  children: ReactNode;
}
const BooksIdsContext = React.createContext<BooksIdsProps | undefined>(
  undefined
);

export const useBooksIds = () => {
  const context = useContext(BooksIdsContext);
  if (!context) {
    throw new Error('useBookIds must be used within an BookIds provider');
  }
  return context;
};

export const BooksIdsProvider = ({ children }: Props) => {
  const [booksDetails, setBooksIds] = React.useState<BookDetails[]>([]);
  return (
    <BooksIdsContext.Provider value={{ booksDetails, setBooksIds }}>
      {children}
    </BooksIdsContext.Provider>
  );
};
