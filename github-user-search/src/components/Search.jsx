import React, { useState } from 'react';
import { fetchAdvancedUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more results

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    setPage(1); // Reset page for a new search
    setHasMore(true); // Reset hasMore for a new search

    const query = [
      username && `user:${username}`,
      location && `location:${location}`,
      minRepos && `repos:>=${minRepos}`,
    ]
      .filter(Boolean)
      .join(' ');

    try {
      const data = await fetchAdvancedUsers(query, 1); // Fetch first page
      setResults(data.items);
      setHasMore(data.total_count > data.items.length); // Check if more results exist
    } catch (err) {
      setError("No results found. Please adjust your search criteria.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = async () => {
    setLoading(true);

    const query = [
      username && `user:${username}`,
      location && `location:${location}`,
      minRepos && `repos:>=${minRepos}`,
    ]
      .filter(Boolean)
      .join(' ');

    try {
      const data = await fetchAdvancedUsers(query, page + 1); // Fetch next page
      setResults((prevResults) => [...prevResults, ...data.items]); // Append new results
      setPage(page + 1); // Increment page
      setHasMore(data.total_count > results.length + data.items.length); // Check if more results exist
    } catch (err) {
      setError("Failed to load more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="results grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results.map((user) => (
          <div key={user.id} className="user-card border p-4 rounded shadow">
            <img
              className="w-16 h-16 rounded-full mx-auto"
              src={user.avatar_url}
              alt={user.login}
            />
            <h3 className="text-center mt-2">{user.login}</h3>
            <p className="text-center text-sm text-gray-600">
              Location: {user.location || 'N/A'}
            </p>
            <p className="text-center text-sm text-gray-600">
              Repositories: {user.public_repos}
            </p>
            <a
              className="block text-center mt-2 text-blue-500 hover:underline"
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button onClick={loadMoreResults} className="btn mt-4">
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
