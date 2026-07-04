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

//!
export const udateUserInfoApi = async (changedData) => {
  const { data } = await api.post(`users/update-info`, changedData);

  return data;
};

//!
export const deleteMyStoryApi = async (id) => {
  const response = await api.delete(`/stories/${id}`);
  return response.data.data;
};
