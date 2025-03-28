import axios from "axios"
import apiClient from "./apiClient";
import { Book } from "./types";

const API_URL = "/ebook/books"
export const getBooks = async (): Promise<Book[]>=>{
    try {
        const response = await apiClient.get<Book[]>(API_URL);
        console.log("Books Fetched successfully");
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the books: ", error);
       throw error
    }
};

export const addBook = async(book:Omit<Book,"id">):Promise<Book>=>{
    try {
        const response = await apiClient.post<Book>(API_URL,book);
        console.log(`New Book '${book.title}' is added successfully`)
        return response.data;
        
    } catch (error) {
        console.log(`Failed to add book '${book.title}'. Error `, error);
        throw error;
    }
};

export const updateBook = async(book:Book,id:string|undefined):Promise<Book>=>{
try {

    const updateData={
      title: book.title,
      //author: book.author,
      isbn: book.isbn,
      language: book.language,
      totalCopies: book.totalCopies,
      publicationYear: book.publicationYear,
    }
    const response = await apiClient.patch<Book>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log(`Failed to update book. Error in updating the book: `,book);
        throw error;
}
}
export const deleteBookById = async(id:string)=>{

    try {
        const response = await apiClient.delete(`${API_URL}/${id}`)
        console.log(`Book with id '${id}' deleted successfully`);
        return response.data
    } catch (error) {
        console.log("Failed to Delete book. Error in deleting the book with id: ",id);
        console.log("Error: ", error)
        throw error;
    }

}

export const getBooksById = async (id: string|number)=>{
    try {
        const response = await apiClient.get(`${API_URL}/${id}`);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching the books with id: ", id);
        console.log("Error:", error);
        return [];
    }
};

