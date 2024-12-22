import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users?q';

/**
 * Fetch users based on advanced criteria.
 * @param {string} username - Username to search.
 * @param {string} location - Location filter for the search.
 * @param {number} minRepos - Minimum number of repositories filter.
 * @returns {Promise<Array>} - List of users matching the criteria.
 */
export const fetchUserData = async (username, location, minRepos) => {
  try {
    // Construct the query string for the API request
    let query = `${username}`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    // Perform the API call
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data.items; // Extract and return the user list
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users. Please try again.');
  }
};
