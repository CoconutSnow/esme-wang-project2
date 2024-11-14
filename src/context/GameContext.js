// src/context/GameContext.js
import React, { createContext, useState } from 'react';

// Create a Context for the game state
const GameContext = createContext();

// Create a Provider Component
const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty
  const [isGameActive, setIsGameActive] = useState(false); // Game state
  const [score, setScore] = useState(0); // Game score

  return (
    <GameContext.Provider value={{ difficulty, setDifficulty, isGameActive, setIsGameActive, score, setScore }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };