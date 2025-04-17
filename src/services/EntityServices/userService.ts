import { EntityService } from './EntityService';
import { User, BorrowedBook, Reservation } from "../types";

const entityService = new EntityService<User>('/ebook/users');
export const getUsers = entityService.getAllItems;
export const getUserById = entityService.getItemById;
export const addUser = entityService.addItem;
export const updateUserById = entityService.updateItem;
export const deleteUserById = entityService.deleteItemById;
export const getBorrowedBooksForUserWithId = (id: String | undefined) =>
  entityService.getRelatedEntityItemsForThisEntityWithId<BorrowedBook>(id, 'borrowedBooks');
export const getReservationsForUserWithId = (id: String | undefined) =>
  entityService.getRelatedEntityItemsForThisEntityWithId<Reservation>(id, 'reservations');
/*

export const updateUserById = async(id:string|undefined,user:User):Promise<User>=>{
try {

    const updateData={
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phoneNumber: user.phoneNumber,
      role: user.role,
    }
    const response = await apiClient.patch<User>(`${API_URL}/${id}`,updateData);
    return response.data
} catch (error) {
    console.log(`Failed to update user. Error in updating the user: `,user);
        throw error;
}
}

*/