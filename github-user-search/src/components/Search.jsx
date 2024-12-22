import React, { useState } from 'react';
import { fetchUsersByCriteria } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const results = await fetchUsersByCriteria(username, location, minRepos);
      setUsers(results);
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
        <div>
          <label htmlFor="location">Location (Optional)</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div>
          <label htmlFor="minRepos">Minimum Repositories (Optional)</label>
          <input
            type="number"
            id="minRepos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Enter minimum repositories"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt={`${user.login} Avatar`} />
              <h3>{user.login}</h3>
              <p>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  View Profile
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
