import React from "react";
import cogSVG from "./assets/cog-svgrepo-com.svg";

function openModel(setIsModalOpen) {
  setIsModalOpen(true);
}

export function ScoreBoard({
  scoreData,
  checkGameOver,
  gameState,
  modalOpen,
  setIsModalOpen,
}) {
  return (
    <div className="scoreBoard">
      <span className={scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
        Player 1: {scoreData.player1}
      </span>
      <span>{scoreData.isPlayer1Turn ? " < " : " > "}</span>
      <span className={!scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
        {(gameState && gameState.playAI ? "Computer: " : "Player 2: ") +
          scoreData.player2}
      </span>
      {checkGameOver() ? (
        <span>
          Game Over.{" "}
          {scoreData.player1 === scoreData.player2
            ? "Draw!"
            : (scoreData.player1 > scoreData.player2
                ? "Player 1"
                : gameState.playAI
                ? "The Computer"
                : "Player 2") + " wins!"}
        </span>
      ) : null}
      {modalOpen || (
        // <button onClick={() => openModel(setIsModalOpen)}>
        <img
          className="settings"
          src={cogSVG}
          height={50}
          width={50}
          onClick={() => openModel(setIsModalOpen)}
        />
        // </button>
      )}
    </div>
  );
}
