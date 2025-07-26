import axios from 'axios';
import { API_URL_NOTES } from './apiConfig';


export const getNotes = async () => {
    try {
        const response = await axios.get(`${API_URL_NOTES}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notes", error);
        throw error;
    }
};

export const registerNote = async (note: { titleNotes: string, contentNotes: string }) => {
    try {
        const response = await axios.post(`${API_URL_NOTES}`, note);
        return response.data;
    } catch (error) {
        console.error("Error registering note", error);
        throw error;
    }
};

export const deleteNote = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL_NOTES}${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
};
