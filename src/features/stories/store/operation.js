import axios from 'axios';

export const fetchStoriesApi = async () => {
  try {
    const response = await axios.get(
      'https://travellers-backend.onrender.com/api/stories',
      {
        params: {
          page: 1,
          perPage: 2,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
