import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import dogImage from '../images/dogWithBlueHoodie.jpg'

function Home() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Logik zur Weiterleitung oder Durchführung der Suche
  };

  const popularTeams = ['Bayern München', 'Real Madrid', 'Manchester United', 'Barcelona'];

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

        {/* Beliebte Teams anzeigen */}
        <div style={styles.popularTeams}>
          <h3>Popular Teams</h3>
          <div style={styles.teamsList}>
            {popularTeams.map((team) => (
              <button
                key={team}
                onClick={() => handleSearch(team)}
                style={styles.teamButton}
              >
                {team}
              </button>
            ))}
          </div>
        </div>

        {/* Bild unterhalb der beliebten Teams zentriert einbinden */}
        <div style={styles.imageContainer}>
          <img src={dogImage} alt="Streaming Comparison" style={styles.image} />
        </div>
      </main>
    </div>
  );
}

const styles = {
  main: {
    textAlign: 'center',
    padding: '20px',
  },
  popularTeams: {
    marginTop: '20px',
  },
  teamsList: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  teamButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  image: {
    maxWidth: '50%',  // Bildbreite auf 50% der Containerbreite setzen
    height: 'auto',   // Höhe automatisch anpassen, um das Seitenverhältnis beizubehalten
    borderRadius: '8px',
  },
};

export default Home;
