import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://travellers-backend.onrender.com/api',
});
