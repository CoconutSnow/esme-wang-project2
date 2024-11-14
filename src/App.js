import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import Game from './components/Game';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>  {/* Use GameProvider for the app */}
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/game/:difficulty" element={<Game />} />  {/* Game element */}
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;