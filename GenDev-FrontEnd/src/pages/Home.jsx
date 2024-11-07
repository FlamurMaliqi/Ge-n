import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Home() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Logik zur Weiterleitung oder Durchführung der Suche
  };

  return (
    <div>
      <Header />
      <main style={styles.main}>
        <h2>Welcome to the Streaming Package Comparison Tool</h2>
        <p>
          Select your teams, compare available packages,
          and find the best deal for you.
        </p>
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
}

const styles = {
  main: {
    textAlign: 'center',
    padding: '20px',
  },
};

export default Home;
