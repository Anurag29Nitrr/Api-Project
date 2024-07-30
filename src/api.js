import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const createPost = (data) => axios.post(`${API_URL}/newPost`, data);
export const getPosts = () => axios.get(`${API_URL}/allPosts`);
export const supportPost = (id) => axios.put(`${API_URL}/supportPost?id=${id}`);
export const notSupportPost = (id) => axios.put(`${API_URL}/notSupportPost?id=${id}`);
export const createContact = (data) => axios.post(`${API_URL}/newContact`, data);
export const getContacts = () => axios.get(`${API_URL}/allContacts`);
