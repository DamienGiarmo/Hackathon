import React, { useState } from 'react';
import { Trees, Bird, Fish, Flower2, Bug, Sprout, AlertTriangle, TrendingDown, Leaf } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BiodiversityGame from './components/BiodiversityGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biodiversity-game" element={<BiodiversityGame />} />
      </Routes>
    </Router>
  );
}

export default App;