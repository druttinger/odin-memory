import React, { useState } from "react";

import robotFace from "./assets/robot-face-svgrepo-com.svg";
import humanFace from "./assets/face-savoring-food-svgrepo-com.svg";
import { PawSVG } from "./pawSVG";
import { CardSizer } from "./CardSizer";

export default function SettingModal({
  setIsModalOpen,
  modalOpen,
  gameState,
  setGameState,
  setScoreData,
  setCardMap,
  setWeightMap,
  setIsActive,
  checkGameOver,
}) {
  const [modalSize, setModalSize] = useState(3);
  const [modalPlayAi, setModalPlayAi] = useState(false);

  const resetGame = () => {
    setIsModalOpen(false);
    setGameState({
      ...gameState,
      flip1: "",
      flip2: "",
      awaitUpdate: true,
      gameSize: modalSize,
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
      <span>
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
            src={humanFace}
            alt="Play against a friend"
            width={90}
            height={90}
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
            src={robotFace}
            alt="Play against the computer"
            width={90}
            height={90}
          />
        </label>
      </span>
      Play against {modalPlayAi ? "AI" : "a friend"}
      <br />
      <CardSizer modalSize={modalSize} setModalSize={setModalSize} />
      <button onClick={resetGame}>New Game</button>
      {checkGameOver() || <button onClick={handleClose}>Cancel</button>}
    </dialog>
  );
}
