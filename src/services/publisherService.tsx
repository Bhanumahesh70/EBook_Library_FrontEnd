import apiClient from './apiClient';

const API_URL = '/ebook/publishers';

type Publisher = {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  bookIds: number[];
};

// Fetch all publishers
export const getPublishers = async (): Promise<Publisher[]> => {
  try {
    const response = await apiClient.get<Publisher[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching publishers:', error);
    throw error;
  }
};

// Add a new publisher
export const addPublisher = async (
  publisher: Omit<Publisher, 'id'>
): Promise<Publisher> => {
  try {
    const response = await apiClient.post<Publisher>(API_URL, publisher);
    console.log(`New Publisher '${publisher.name}' added successfully`);
    return response.data;
  } catch (error) {
    console.error(`Failed to add publisher '${publisher.name}'. Error:`, error);
    throw error;
  }
};

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

// Delete a publisher by ID
export const deletePublisherById = async (id: string) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    console.log(`Publisher with ID '${id}' deleted successfully`);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to delete publisher. Error in deleting publisher with ID:',
      id
    );
    console.error('Error:', error);
    throw error;
  }
};

// Fetch a publisher by ID
export const getPublisherById = async (id: string | number) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching publisher with ID:', id);
    console.error('Error:', error);
    return null;
  }
};
