import axios from "axios"

const API_URL = "http://localhost:8080/books"
type Book = {
    id: string;
    title: string;
    author: string;
    language: string;
    publicationYear: string;
    isbn: string;
    totalCopies:string;
  };
export const getBooks = async (): Promise<Book[]>=>{
    try {
        const response = await axios.get<Book[]>(API_URL);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the books: ", error);
       throw error
    }
};

export const addBook = async(book:Omit<Book,"id">):Promise<Book>=>{
    try {
        const response = await axios.post<Book>(API_URL,book);
        return response.data;
        
    } catch (error) {
        console.log("Failed to add book. Error in adding the books: ", error);
        throw error;
    }
};

export const updateBook = async(book:Book,id:string|undefined):Promise<Book>=>{
try {

    const updateData={
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      language: book.language,
      totalCopies: book.totalCopies,
      publicationYear: book.publicationYear,
    }
    const response = await axios.put<Book>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log("Failed to update book. Error in updating the book: ",book);
    console.log("link",`${API_URL}/${id}`)
        throw error;
}

}