import React, { createContext, useState, useContext } from "react";

// 创建 GameContext
const GameContext = createContext();

// 自定义 Hook 用于访问上下文
export const useGameContext = () => {
  return useContext(GameContext);
};

// GameProvider 组件，用于提供上下文
export const GameProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState("");  // 游戏状态消息
  const [grid, setGrid] = useState([]);  // 游戏网格
  const [minesCount, setMinesCount] = useState(0);  // 地雷数量

  // 返回包含状态的上下文提供者
  return (
    <GameContext.Provider value={{ gameStatus, setGameStatus, grid, setGrid, minesCount, setMinesCount }}>
      {children}
    </GameContext.Provider>
  );
};