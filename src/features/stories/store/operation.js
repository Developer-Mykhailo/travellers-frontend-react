import axios from 'axios';

axios.defaults.baseURL = 'https://travellers-backend.onrender.com/api';

export const fetchPublicStoriesApi = async (page, perPage) => {
  try {
    const response = await axios.get('/stories', {
      params: {
        page,
        perPage,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
