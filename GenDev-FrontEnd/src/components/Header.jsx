import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <h1 style ={styles.h1}>Streaming Package Comparison</h1>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/team-selection" style={styles.link}>Team Selection</Link></li>
          <li><Link to="/about" style={styles.link}>About</Link></li>
        </ul>
      </nav>
    </header>
  );
}

const styles = {
  h1: {
    color: "#fff"
  },
  header: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',          // Add flex display
    justifyContent: 'center',  // Center the list items
    alignItems: 'center',      // Center vertically
    margin: 0,
  },
  link: {
    color: '#fff',
    margin: '0 15px',
    textDecoration: 'none',
  }
};

export default Header;
