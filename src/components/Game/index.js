// src/components/Game/index.js
import React from "react";
import { useParams } from "react-router-dom";  // 获取路由参数
import { GameContext } from "../../context/GameContext"; // 导入 GameContext
import Board from "../Board";
import "./style.css";

// 使用 static contextType 来访问 Context 中的状态
class Game extends React.Component {
  static contextType = GameContext;  // 引入 GameContext

  constructor(props) {
    super(props);

    this.boardElement = React.createRef();

    const settings = this.getSettingsByDifficulty(props.difficulty);
    this.state = {
      height: settings.height,
      width: settings.width,
      mines: settings.mines,
      gameStatusMessage: "", // 用于显示游戏结束提示
    };
  }

  handleGameEnd = (message) => {
    this.setState({ gameStatusMessage: message });
    this.context.setIsGameActive(false); // 使用 Context 更新游戏状态
  };

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      const settings = this.getSettingsByDifficulty(this.props.difficulty);
      this.setState({
        height: settings.height,
        width: settings.width,
        mines: settings.mines,
        gameStatusMessage: "",
      }, () => {
        this.restartGame();
      });
    }
  }

  getSettingsByDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        return { height: 8, width: 8, mines: 10 };
      case "medium":
        return { height: 16, width: 16, mines: 40 };
      case "hard":
        return { height: 16, width: 30, mines: 99 };
      default:
        return { height: 8, width: 8, mines: 10 };
    }
  }

  restartGame = () => {
    this.boardElement.current.restartBoard(); // 重新生成地雷布局
    this.setState({ gameStatusMessage: "" }); // 清空游戏状态提示
    this.context.setScore(0);  // 使用 Context 重置分数
    this.context.setIsGameActive(true); // 使用 Context 启动游戏
  };

  render() {
    const { height, width, mines, gameStatusMessage } = this.state;
    return (
      <div className="game">
        {/* 游戏顶部的状态和重置按钮 */}
        <header className="game-header">
          <button onClick={this.restartGame}>Restart</button>
          {gameStatusMessage && (
            <div className="game-status">
              <h2>{gameStatusMessage}</h2>
            </div>
          )}
        </header>

        {/* 游戏板 */}
        <Board
          ref={this.boardElement}
          height={height}
          width={width}
          mines={mines}
          onGameEnd={this.handleGameEnd} // 传递结束回调
        />
      </div>
    );
  }
}

// 使用 useParams 获取 difficulty 参数
export default function GameWithParams() {
  const { difficulty } = useParams(); // 获取路由中的 difficulty 参数
  return <Game difficulty={difficulty} />;  // 将 difficulty 参数传递给 Game 组件
}