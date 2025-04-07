import { EntityService } from "./EntityService";
import { Category, Book } from "./types";

const entityService = new EntityService<Category>("/ebook/categories")
export const getCategories = entityService.getAllItems;
export const getCategoryById = entityService.getItemById
export const addCategory = entityService.addItem;
export const updateCategoryById = entityService.updateItem;
export const deleteCategoryById =entityService.deleteItemById;
export const getBooksForCategoryWithId = (id: String | undefined)=>entityService.getRelatedEntityItemsForThisEntityWithId<Book>(id,"books")
