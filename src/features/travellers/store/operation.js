import axios from 'axios';

axios.defaults.baseURL = 'https://travellers-backend.onrender.com/api';

// !
export const fetchTravellersApi = async (page, perPage) => {
  try {
    const response = await axios.get('/users', {
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

// !
export const fetchTravellerByIdApi = async (id) => {
  try {
    const response = await axios.get(`/users/public/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
