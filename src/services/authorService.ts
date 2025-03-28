import apiClient from "./apiClient";
import { Author, Book } from "./types";


const API_URL = "/ebook/authors";

export const getAuthors = async (): Promise<Author[]> => {
    try {
        const response = await apiClient.get<Author[]>(API_URL);
        console.log("Authors fetched successfully");
        return response.data;
    } catch (error) {
        console.log("Error in fetching authors. Error:", error);
        throw error;
    }
};

export const getAuthorById = async (id: string | undefined): Promise<Author> => {
    try {
        const response = await apiClient.get<Author>(`${API_URL}/${id}`);
        console.log("Author fetched successfully for id:", id);
        return response.data;
    } catch (error) {
        console.log(`Error in fetching author for id(${id}). Error:`, error);
        throw error;
    }
};
export const getBooksForAuthorWithId = async (id: String | undefined):Promise<Book[]>=>{

    try {
        const response = await apiClient.get<Book[]>(`${API_URL}/${id}/books`);
        console.log("Books are fecthed successfully for author with id:",id);
        return response.data;
    } catch (error) {
        console.log(`Error in fetching books for author id(${id}). Error: `,error);
        throw error;
    }
}
export const addAuthor = async (author: Author): Promise<Author> => {
    try {
        const response = await apiClient.post<Author>(API_URL, author);
        console.log(`New author '${author.name}' added successfully`);
        return response.data;
    } catch (error) {
        console.log(`Error in adding author '${author.name}'. Error:`, error);
        throw error;
    }
};

export const updateAuthorById = async (id: string | undefined, author: Author): Promise<Author> => {
    try {
        const response = await apiClient.patch<Author>(`${API_URL}/${id}`, author);
        console.log("Author updated successfully with id:", id);
        return response.data;
    } catch (error) {
        console.log(`Error in updating author with id(${id}). Error:`, error);
        throw error;
    }
};

export const deleteAuthorById = async (id: string | undefined): Promise<void> => {
    try {
        await apiClient.delete(`${API_URL}/${id}`);
        console.log("Author deleted successfully with id:", id);
    } catch (error) {
        console.log(`Error in deleting author with id(${id}). Error:`, error);
        throw error;
    }
};