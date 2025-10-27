import React, { useState } from 'react';
import API from '../../services/api';

function Search({ loading, setLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const data = await API.search.query(searchQuery);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <div className="search-section">
        <h2>🔍 Search</h2>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search users, products, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {searchResults && (
          <div className="search-results">
            <h3>Search Results for "{searchResults.query}" ({searchResults.totalResults} found)</h3>
            
            {searchResults.results.users && searchResults.results.users.length > 0 && (
              <div className="result-category">
                <h4>Users ({searchResults.results.users.length})</h4>
                <div className="results-grid">
                  {searchResults.results.users.map(user => (
                    <div key={user.id} className="result-card">
                      <h5>{user.name}</h5>
                      <p>{user.email}</p>
                      <span className={`role-badge ${user.role}`}>{user.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.results.products && searchResults.results.products.length > 0 && (
              <div className="result-category">
                <h4>Products ({searchResults.results.products.length})</h4>
                <div className="results-grid">
                  {searchResults.results.products.map(product => (
                    <div key={product.id} className="result-card">
                      <h5>{product.name}</h5>
                      <p>${product.price} - {product.category}</p>
                      <p>Stock: {product.stock}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.results.tasks && searchResults.results.tasks.length > 0 && (
              <div className="result-category">
                <h4>Tasks ({searchResults.results.tasks.length})</h4>
                <div className="results-grid">
                  {searchResults.results.tasks.map(task => (
                    <div key={task.id} className="result-card">
                      <h5>{task.title}</h5>
                      <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                      <span className={`status ${task.completed ? 'completed' : 'pending'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.totalResults === 0 && (
              <p>No results found for "{searchResults.query}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
