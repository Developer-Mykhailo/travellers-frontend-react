import { api } from '../../../api/client';

// !
export const fetchPublicStoriesApi = async ({
  page,
  perPage,
  category,
  sortBy = 'createdAt',
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

// !
export const createStoryApi = async (formData) => {
  const response = await api.post('/stories', formData);
  return response.data.data;
};

//!
export const updateStoryApi = async (id, formData) => {
  const response = await api.patch(`/stories/update-story/${id}`, formData);
  return response.data.data;
};
