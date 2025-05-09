import { EntityService } from './EntityService';
import { Publisher, Book } from '../types';

const entityService = new EntityService<Publisher>('/ebook/publishers');
export const getPublishers = entityService.getAllItems;
export const getPublisherById = entityService.getItemById;
export const addPublisher = entityService.addItem;
export const updatePublisher = entityService.updateItem;
export const deletePublisherById = entityService.deleteItemById;
export const getBooksForPublisherWithId = (id: String | undefined) =>
  entityService.getRelatedEntityItemsForThisEntityWithId<Book>(id, 'books');

export const uploadImage =(formdata : FormData, id : string)=>{ entityService.uploadImage(formdata,id,"uploadImage")}
/*
// Update an existing publisher
export const updatePublisher = async (
  publisher: Publisher,
  id: string | undefined
): Promise<Publisher> => {
  try {
    const updateData = {
      name: publisher.name,
      address: publisher.address,
      email: publisher.email,
      phoneNumber: publisher.phoneNumber,
      bookIds: publisher.bookIds,
    };
    const response = await apiClient.patch<Publisher>(
      `${API_URL}/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to update publisher. Error in updating the publisher:`,
      error
    );
    throw error;
  }
};

*/
