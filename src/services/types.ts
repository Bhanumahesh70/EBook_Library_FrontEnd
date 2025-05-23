export type AuthorsDetails={
    id: string;
    name: string;
}
export type CategoriesDetails={
    id: string;
    categoryName: string;
}
export type PublisherDetails={
    id: string;
    name: string;
}
export type BookDetails={
    id: string;
    title: string;
}
export type UserDetails={
    id: string| undefined;
    name: string;
}
export type ReservationDetails={
    id: string;
    bookId:string;
    status : string;
    reservationDate: Date
}
export type BorrowedBookDetails = {
    id: string;
    status : string;
    bookId:string;
    borrowedDate: Date;
}

export type BorrowedBookDetails2 = {
    id: string;
    status : string;
    borrowedDate: Date;
    bookDetails: BookDetails;
}
export type FineDetails = {
    id: string;
    amount : string;
    status : string;
    paidDate: Date;
}
export type Book=  {
    id: string;
    title: string;
    //author: string;
    language: string;
    publicationYear: string;
    isbn: string;
    totalCopies:string;
    availableCopies:string;
    publisherId:string;
   // categoryIds:string[];
    //authorIds:string[];
    authorsDetails: AuthorsDetails[]
    //categoriesDTO: Category[];
    categoriesDetails: CategoriesDetails[]
    publisherDetails:PublisherDetails
    coverImageUrl: string;
  };

export  type Category={
    id: string;
    categoryName : string;
    description: string;
}

export type Publisher = {
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    bookIds: string[];
    coverImageUrl: string;
  };

  export  type Author = {
    id: string;
    name: string;
    bio: string;
    nationality: string;
    birthDate: string;
    bookDetails: BookDetails[];
    coverImageUrl: string;
};

export type User=  {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role:string;
    reservationDetails:ReservationDetails[];
    borrowedBookDetails: BorrowedBookDetails[];

  };

export type Reservation = {
    id:string;
    reservationDate : Date| null;
    status : string;
    numberOfDays: string;
    userDetails : UserDetails;
    bookDetails: BookDetails;
}

export type BorrowedBook = {
    id : string;
    borrowedDate: Date
    returnDate: Date
    returnedOn?: Date
    status: string
    bookBorrowCost: string
    userDetails: UserDetails
    bookDetails: BookDetails
    fineId : string;
    fineDetails : FineDetails
}
export type Fine = {
    id : string;
    amount : string;
    status : string;
    paidDate: Date;
    userDetails: UserDetails;
    borrowedBookDetails: BorrowedBookDetails2;
}
export interface Column<T> {
    label: string;
    key: string;
    type: 'text' | 'date' | 'select';
    getValue: (item: T) => any;
    filterFn?: (item: T, filterValue: any) => boolean;
    render?: (item: T) => React.ReactNode;
    options?: string[];
    includeFilter?: boolean;
    includeSort?: boolean;
  }

