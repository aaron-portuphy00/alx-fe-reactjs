import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Use fetchUserData for basic user data retrieval
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="username">GitHub Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt={`${userData.login} Avatar`} />
          <h3>{userData.name || userData.login}</h3>
          <p>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Location: {userData.location || 'Not provided'}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
