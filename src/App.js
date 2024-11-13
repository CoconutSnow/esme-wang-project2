import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import GameWithParams from './components/Game';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />                 {/* 主页 */}
          <Route path="/rules" element={<Rules />} />           {/* 规则页面 */}
          <Route path="/game/:difficulty" element={<GameWithParams />} /> {/* 游戏页面 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
