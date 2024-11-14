import React from "react";
import { useParams } from "react-router-dom"; 
import { GameContext } from "../../context/GameContext"; // use GameContext
import Board from "../Board";
import "./style.css";

// use static contextType to connect Context
class Game extends React.Component {
  static contextType = GameContext; // stage management

  constructor(props) {
    super(props);

    this.boardElement = React.createRef();

    const settings = this.getSettingsByDifficulty(props.difficulty);
    this.state = {
      height: settings.height,
      width: settings.width,
      mines: settings.mines,
      gameStatusMessage: "",
    };
  }

  handleGameEnd = (message) => {
    this.setState({ gameStatusMessage: message });
    this.context.setIsGameActive(false); // stage management use Context for update
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
    this.boardElement.current.restartBoard(); 
    this.setState({ gameStatusMessage: "" }); 
    this.context.setScore(0);  // use Context for new scores
    this.context.setIsGameActive(true); 
  };

  render() {
    const { height, width, mines, gameStatusMessage } = this.state;
    return (
      <div className="game">
        {/* restart button */}
        <header className="game-header">
          <button onClick={this.restartGame}>Restart</button>
          {gameStatusMessage && (
            <div className="game-status">
              <h2>{gameStatusMessage}</h2>
            </div>
          )}
        </header>

        {/* game board */}
        <Board
          ref={this.boardElement}
          height={height}
          width={width}
          mines={mines}
          onGameEnd={this.handleGameEnd}
        />
      </div>
    );
  }
}

// use useParams for difficulty 
export default function GameWithParams() {
  const { difficulty } = useParams(); 
  return <Game difficulty={difficulty} />;
}