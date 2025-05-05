import { EntityService } from './EntityService';
import { Fine } from '../types';

const entityService = new EntityService<Fine>('/ebook/fines');

export const getFines = entityService.getAllItems;
export const getFineById = entityService.getItemById;
export const addFine = entityService.addItem;
export const updateFine = entityService.updateItem;
export const deleteFineById = entityService.deleteItemById;