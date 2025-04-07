import { EntityService } from "./EntityService";
import { Book } from "./types";

const entityService = new EntityService<Book>("/ebook/books")
export const getBooks = entityService.getAllItems;
export const getBooksById = entityService.getItemById
export const addBook = entityService.addItem;
export const updateBook = entityService.updateItem;
export const deleteBookById =entityService.deleteItemById
/*
export const updateBook = async(id:string|undefined,book:Book):Promise<Book>=>{
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
*/

