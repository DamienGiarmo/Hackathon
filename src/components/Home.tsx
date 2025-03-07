import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Biodiversity Game</h1>
      <Link 
        to="/biodiversity-game"
        className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
      >
        Mini Game
      </Link>
    </div>
  );
};

export default Home; 