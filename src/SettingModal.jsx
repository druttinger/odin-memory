import React, { useState } from "react";

import { PawSVG } from "./pawSVG";

export default function SettingModal({
  setIsModalOpen,
  modalOpen,
  gameState,
  setGameState,
  setScoreData,
  setCardMap,
  setWeightMap,
  setIsActive,
}) {
  const [modalSize, setModalSize] = useState(3); // Use state instead of ref
  const [modalPlayAi, setModalPlayAi] = useState(false);

  const resetGame = () => {
    setIsModalOpen(false);
    setGameState({
      ...gameState,
      flip1: "",
      flip2: "",
      awaitUpdate: true,
      gameSize: modalSize, // Use state value here
      playAI: modalPlayAi,
      gameOver: false,
    });
    setScoreData({ player1: 0, player2: 0, isPlayer1Turn: true });
    setCardMap([]);
    setWeightMap({});
    setIsActive(new Array(modalSize * 2).fill(false));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <dialog className="modal" open={modalOpen}>
      <h2>Puppy Memory</h2>
      <PawSVG />
      <h3>Game Settings</h3>
      <div>
        <label>
          <input
            type="radio"
            name="ai"
            value="human"
            checked={!modalPlayAi} // Checked when modalPlayAI.current is false
            onChange={() => {
              setModalPlayAi(false); // Update modalPlayAI to false
            }}
          />
          <img
            src="./src/assets/face-savoring-food-svgrepo-com.svg"
            alt="Play against a friend"
            width={50}
            height={50}
          />
        </label>
        <label>
          <input
            type="radio"
            name="ai"
            value="ai"
            checked={modalPlayAi} // Checked when modalPlayAI.current is true
            onChange={() => {
              setModalPlayAi(true);
            }}
          />
          <img
            src="./src/assets/robot-face-svgrepo-com.svg"
            alt="Play against the computer"
            width={50}
            height={50}
          />
        </label>
        Play against AI
        <br />
        <label>
          <input
            type="number"
            value={modalSize}
            min="3"
            max="20"
            onChange={(e) => {
              const newSize = Math.max(3, Math.min(20, e.target.value)); // Clamp value between 3 and 20
              console.log("New game size:", newSize);
              setModalSize(newSize);
            }}
          />
          Game Size (3-20)
        </label>
      </div>
      <button onClick={resetGame}>New Game</button>
      {!gameState.gameOver || <button onClick={handleClose}>Cancel</button>}
    </dialog>
  );
}
