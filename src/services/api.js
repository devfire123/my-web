import axios from 'axios';

const API_URL = '/api';
const IS_DEV = import.meta.env.DEV;

export const api = {
    // Writeups
    getWriteups: async () => {
        if (IS_DEV) {
            const response = await axios.get(`${API_URL}/writeups`);
            return response.data;
        } else {
            // Production: Fetch from static JSON
            const response = await axios.get('/data/writeups.json');
            return response.data;
        }
    },
    getWriteup: async (id) => {
        if (IS_DEV) {
            const response = await axios.get(`${API_URL}/writeups/${id}`);
            return response.data;
        } else {
            // Production: Fetch from static JSON and find item
            const response = await axios.get('/data/writeups.json');
            const writeup = response.data.find(w => w.id === id);

            // Fetch content
            if (writeup) {
                const contentRes = await axios.get(`/writeups/${id}.md`);
                return { ...writeup, content: contentRes.data };
            }
            return null;
        }
    },
    saveWriteup: async (writeup) => {
        if (!IS_DEV) throw new Error("Admin features are disabled in production.");
        const response = await axios.post(`${API_URL}/writeups`, writeup);
        return response.data;
    },
    deleteWriteup: async (id) => {
        if (!IS_DEV) throw new Error("Admin features are disabled in production.");
        const response = await axios.delete(`${API_URL}/writeups/${id}`);
        return response.data;
    },

    // Auth
    login: async (password) => {
        if (!IS_DEV) throw new Error("Admin features are disabled in production.");
        const response = await axios.post(`${API_URL}/login`, { password });
        return response.data;
    },

    // Upload
    uploadImage: async (file) => {
        if (!IS_DEV) throw new Error("Admin features are disabled in production.");
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};
