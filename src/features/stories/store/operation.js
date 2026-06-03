import axios from 'axios';

axios.defaults.baseURL = 'https://travellers-backend.onrender.com/api';

// !
export const fetchPublicStoriesApi = async (page, perPage, category) => {
  try {
    const response = await axios.get('/stories', {
      params: {
        page,
        perPage,
        category,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// !
export const fetchPublicStoryByIdApi = async (id) => {
  try {
    const response = await axios.get(`/stories/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// !
export const fetchCategoriesApi = async () => {
  try {
    const response = await axios.get('/stories/categories', {});

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
