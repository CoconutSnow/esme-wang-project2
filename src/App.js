// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import Game from './components/Game'; // 直接导入 Game
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';  // 导入 GameProvider

function App() {
  return (
    <GameProvider>  {/* 使用 GameProvider 包裹整个应用 */}
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/game/:difficulty" element={<Game />} />  {/* 直接渲染 Game 组件 */}
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;