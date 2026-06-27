import { api } from '../../../api/client';

//!
export const fetchUserApi = async () => {
  const { data } = await api.get('users/my-profile');

  return data;
};

//!
export const toggleSaveStoryApi = async (id) => {
  const { data } = await api.patch(`users/toggle-save-story/${id}`);

  return data;
};
