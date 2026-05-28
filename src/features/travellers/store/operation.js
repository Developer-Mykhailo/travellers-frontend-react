import axios from 'axios';

axios.defaults.baseURL = 'https://travellers-backend.onrender.com/api';

export const fetchTravellersApi = async () => {
  try {
    const response = await axios.get('/users', {
      params: {
        page: 1,
        perPage: 100,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
