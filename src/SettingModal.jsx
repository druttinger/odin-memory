import React, { useState } from "react";

import robotFace from "./assets/robot-face-svgrepo-com.svg";
import humanFace from "./assets/face-savoring-food-svgrepo-com.svg";
import returnSVG from "./assets/previous-return-svgrepo-com.svg";
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
  const [modalSize, setModalSize] = useState(gameState.gameSize);
  const [optionText, setOptionText] = useState("");

  const resetGame = (playAI) => {
    setIsModalOpen(false);
    setGameState({
      ...gameState,
      flip1: "",
      flip2: "",
      awaitUpdate: true,
      gameSize: modalSize,
      playAI: playAI,
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
      <CardSizer modalSize={modalSize} setModalSize={setModalSize} />
      <span>
        <label>
          <input
            type="radio"
            name="ai"
            value="human"
            // checked={!modalPlayAi} // Checked when modalPlayAI.current is false
            onChange={() => {
              resetGame(false);
            }}
          />
          <img
            src={humanFace}
            alt="Play against a friend"
            onMouseEnter={() => setOptionText("Play against a friend")}
            onMouseLeave={() => setOptionText("")}
            width={90}
            height={90}
          />
        </label>
        <label>
          <input
            type="radio"
            name="ai"
            value="ai"
            // checked={modalPlayAi} // Checked when modalPlayAI.current is true
            onChange={() => {
              resetGame(true);
            }}
          />
          <img
            src={robotFace}
            alt="Play against the computer"
            onMouseEnter={() => setOptionText("Play against the computer")}
            onMouseLeave={() => setOptionText("")}
            width={90}
            height={90}
          />
        </label>
        {checkGameOver() || (
          <label>
            <input
              type="radio"
              name="close"
              value="close"
              onChange={handleClose}
            />
            <img
              src={returnSVG}
              alt="Return to game"
              onMouseEnter={() => setOptionText("Return to game")}
              onMouseLeave={() => setOptionText("")}
              width={90}
              height={90}
            />
          </label>
        )}
      </span>
      <div className="optionText"> {optionText}</div>
      {/* <br /> */}
    </dialog>
  );
}
