import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchAdvancedUsers = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query, page, per_page: 30 }, // Fetch 30 results per page
    });
    return response.data; // Includes items and total_count
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
