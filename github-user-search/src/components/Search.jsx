import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUser(null);

    try {
      const result = await fetchUserData(username);
      setUser(result);
    } catch (err) {
      setError("Looks like we can't find the user");
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
      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={`${user.login} Avatar`} />
          <h3>{user.name || user.login}</h3>
          <p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </p>
          <p>Public Repos: {user.public_repos}</p>
          <p>Location: {user.location || 'Not provided'}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
