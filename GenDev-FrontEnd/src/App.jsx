import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchResult />} />
        <Route path="/turnup" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
