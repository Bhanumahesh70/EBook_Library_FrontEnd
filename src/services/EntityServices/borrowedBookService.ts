import { EntityService } from './EntityService';
import { BorrowedBook } from '../types';

const entityService = new EntityService<BorrowedBook>('/ebook/borrowedBooks');

export const getBorrowedBooks = entityService.getAllItems;
export const getBorrowedBookById = entityService.getItemById;
export const addBorrowedBook = entityService.addItem;
export const updateBorrowedBook = entityService.updateItem;
export const deleteBorrowedBookById = entityService.deleteItemById;
export const returnBorrowedBook = (borrowedBook: BorrowedBook )=>{

    entityService.actionMethod(borrowedBook,"returnBook");
}