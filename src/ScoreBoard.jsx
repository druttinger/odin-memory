import React from "react";

function openModel(setIsModalOpen) {
  setIsModalOpen(true);
}

export function ScoreBoard(
  scoreData,
  checkGameOver,
  gameState,
  modalOpen,
  setIsModalOpen
) {
  return (
    <div className="scoreBoard">
      <span className={scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
        Player 1: {scoreData.player1}
      </span>
      <span>{scoreData.isPlayer1Turn ? " < " : " > "}</span>
      <span className={!scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
        Player 2: {scoreData.player2}
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
        <button onClick={() => openModel(setIsModalOpen)}>Options</button>
      )}
    </div>
  );
}
