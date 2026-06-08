import axios from 'axios';
import { api } from '../../../api/client';

// !
export const fetchPublicStoriesApi = async (page, perPage, category) => {
  const response = await api.get('/stories', {
    params: {
      page,
      perPage,
      category,
    },
  });

  return response.data.data;
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
