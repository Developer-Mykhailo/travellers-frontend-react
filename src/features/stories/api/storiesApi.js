import { api } from '../../../api/client';

// !
export const fetchPublicStoriesApi = async ({
  page,
  perPage,
  category,
  sortBy,
  sortOrder = 'desc',
}) => {
  const response = await api.get('/stories', {
    params: {
      page,
      perPage,
      category,
      sortBy,
      sortOrder,
    },
  });

  return response.data.data;
};

// !
export const fetchPublicStoryByIdApi = async (id) => {
  const response = await api.get(`/stories/${id}`);
  return response.data.data;
};

// !
export const fetchCategoriesApi = async () => {
  const response = await api.get('/stories/categories');
  return response.data.data;
};
