import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for teams, leagues or matches"
        style={styles.searchInput}
      />
      <button onClick={handleSearch} style={styles.searchButton}>Search</button>
    </div>
  );
}

const styles = {
  searchContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default SearchBar;
