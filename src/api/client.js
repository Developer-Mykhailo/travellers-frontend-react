import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://travellers-backend.onrender.com/api',
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});
