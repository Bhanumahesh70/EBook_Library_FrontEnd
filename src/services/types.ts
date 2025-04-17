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
  };

  export  type Author = {
    id: string;
    name: string;
    bio: string;
    nationality: string;
    birthDate: string;
    bookDetails: BookDetails[];
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
    totalCost: string
    userDetails: UserDetails
    bookDetails: BookDetails
    fineId : string;
}