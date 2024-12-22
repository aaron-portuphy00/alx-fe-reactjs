import axios from 'axios';

// GitHub API Base URL
const BASE_URL = 'https://api.github.com/search/users';

/**
 * Fetch users by search query
 * @param {string} username - GitHub username to search
 * @param {string} location - User location for advanced filtering
 * @param {number} minRepos - Minimum repository count for advanced filtering
 * @returns {Promise} - List of users matching the criteria
 */
export const fetchUsersByCriteria = async (username, location, minRepos) => {
  try {
    // Construct the query string
    let query = `${username}`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    // Make the API request
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data.items; // Return list of users
  } catch (error) {
    console.error('Error fetching users by criteria:', error);
    throw new Error('Failed to fetch users. Please try again.');
  }
};
