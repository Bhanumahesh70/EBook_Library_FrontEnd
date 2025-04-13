import { EntityService } from './EntityService';
import { Reservation } from '../types';

const entityService = new EntityService<Reservation>('/ebook/reservations');
export const getReservations = entityService.getAllItems;
export const getReservationById = entityService.getItemById;
export const addReservation = entityService.addItem;
export const updateReservation = entityService.updateItem;
export const deleteReservationById = entityService.deleteItemById;