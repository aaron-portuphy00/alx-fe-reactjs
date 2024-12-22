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
      const data = await fetchUsersByCriteria(username, location, minRepos);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (optional)"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum repositories (optional)"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && users.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt="User Avatar" />
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
