import React from "react";
import Confetti from "react-confetti";
import returnSVG from "./assets/previous-return-svgrepo-com.svg";
import cogSVG from "./assets/cog-svgrepo-com.svg";
import "./styles/message.css";

export default function DisplayGameOver({
  scoreData,
  resetGame,
  setIsModalOpen,
}) {
  const [optionText, setOptionText] = React.useState("");
  const sizeReference =
    window.innerWidth > window.innerHeight
      ? window.innerWidth
      : window.innerHeight;
  const player1Wins = scoreData.player1 > scoreData.player2;

  return (
    <>
      <div className="gameMessage">
        <div
          className={player1Wins ? "player1" : "player2"}
          style={{ fontSize: sizeReference / 10 }}
        >
          Game Over!
        </div>
        <div
          className={player1Wins ? "player1" : "player2"}
          style={{ fontSize: sizeReference / 20 }}
        >
          {player1Wins ? "Player 1 Wins!" : "Player 2 Wins!"}
        </div>
        <div className="resetButtons" height={sizeReference / 3}>
          <img
            src={returnSVG}
            style={{
              width: sizeReference / 20,
              height: sizeReference / 20,
              borderRadius: sizeReference / 60,
            }}
            alt="Play Again"
            onClick={() => {
              resetGame();
              setOptionText("");
            }}
            onMouseEnter={() => setOptionText("Play Again")}
            onMouseLeave={() => setOptionText("")}
          />
          <img
            src={cogSVG}
            style={{
              width: sizeReference / 20,
              height: sizeReference / 20,
              borderRadius: sizeReference / 60,
            }}
            alt="Settings"
            onClick={() => {
              setIsModalOpen(true);
              setOptionText("");
            }}
            onMouseEnter={() => setOptionText("Settings")}
            onMouseLeave={() => setOptionText("")}
          />
          <div style={{ fontSize: sizeReference / 80 }}>{optionText}</div>
        </div>
      </div>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={(window.innerWidth * window.innerHeight) / 1000}
        recycle={false}
      />
    </>
  );
}
