import axios from 'axios';

export const fetchUsersByCriteria = async (query) => {
  const BASE_URL = 'https://api.github.com/search/users';
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data.items;
  } catch (error) {
    throw new Error('No users found for the given criteria');
  }
};



