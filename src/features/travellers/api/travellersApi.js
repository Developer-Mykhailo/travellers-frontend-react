import { api } from '../../../api/client';

// !
export const fetchTravellersApi = async (page, perPage) => {
  const response = await api.get('/users', {
    params: {
      page,
      perPage,
    },
  });

  return response.data.data;
};

// !
export const fetchTravellerByIdApi = async (id) => {
  const response = await api.get(`/users/public/${id}`);
  return response.data.data;
};
