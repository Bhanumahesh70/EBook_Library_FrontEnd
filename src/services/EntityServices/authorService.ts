import apiClient from "../apiClient";
import { Author, Book } from "../types";
import { EntityService } from "./EntityService";

const entityService = new EntityService<Author>("/ebook/authors")
export const getAuthors = entityService.getAllItems;
export const getAuthorById = entityService.getItemById
export const addAuthor = entityService.addItem;
export const updateAuthorById = entityService.updateItem;
export const deleteAuthorById =entityService.deleteItemById;
export const getBooksForAuthorWithId = (id: String | undefined)=>entityService.getRelatedEntityItemsForThisEntityWithId<Book>(id,"books")

export const uploadImage =(formdata : FormData, id : string)=>{ entityService.uploadImage(formdata,id,"uploadImage")}