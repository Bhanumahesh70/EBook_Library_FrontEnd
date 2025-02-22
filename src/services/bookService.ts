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
    const response = await axios.patch<Book>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log("Failed to update book. Error in updating the book: ",book);
        throw error;
}
}
export const deleteBookById = async(id:string)=>{

    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.log("Failed to Delete book. Error in deleting the book with id: ",id);
        console.log("Error: ", error)
        throw error;
    }

}

