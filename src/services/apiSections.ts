import axios from 'axios';
import { API_URL_SECTIONS } from './apiConfig';



export const getSections = async () => {
    try {
        const response = await axios.get(`${API_URL_SECTIONS}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sections", error);
        throw error;
    }
};

export const registerSections = async (section: { titleSections: string }) => {
    try {
        const response = await axios.post(`${API_URL_SECTIONS}`, section);
        return response.data;
    } catch (error) {
        console.error("Error registering section", error);
        throw error;
    }
};

export const deleteSection = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL_SECTIONS}${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting section", error);
        throw error;
    }
};
