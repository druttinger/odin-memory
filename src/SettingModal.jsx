import React, { useState } from "react";
import robotFace from "./assets/robot-face-svgrepo-com.svg";
import humanFace from "./assets/face-savoring-food-svgrepo-com.svg";
import returnSVG from "./assets/previous-return-svgrepo-com.svg";
import { PawSVG } from "./pawSVG";
import { CardSizer } from "./CardSizer";
import "./styles/settings.css";

export default function SettingModal({
  setIsModalOpen,
  modalOpen,
  gameState,
  checkGameOver,
  resetGame,
}) {
  const [modalSize, setModalSize] = useState(gameState.gameSize);
  const [optionText, setOptionText] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modalBackdrop" />
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
                resetGame(false, modalSize);
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
                resetGame(true, modalSize);
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
          {checkGameOver() || gameState.matchState || (
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
    </>
  );
}
