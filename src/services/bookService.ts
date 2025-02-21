import axios from "axios"

const API_URL = "http://localhost:8080/books"
type Book = {
    id: string;
    title: string;
    author: string;
    language: string;
    publicationYear: string;
  };
export const getBooks = async (): Promise<Book[]>=>{
    try {
        const response = await axios.get<Book[]>(API_URL);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the books: ", error);
        return [];
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