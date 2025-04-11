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
    name: string;
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

  };
  