import React from "react";
import "./message.css";

export default function DisplayMatch({ scoreData, endAnimation }) {
  const sizeReference =
    window.innerWidth > window.innerHeight
      ? window.innerWidth
      : window.innerHeight;

  return (
    <>
      <div className="quickMessage">
        <div
          className={scoreData.isPlayer1Turn ? "player1" : "player2"}
          style={{ fontSize: sizeReference / 15 }}
          onAnimationEnd={endAnimation}
        >
          Match!
        </div>
        <div
          className={scoreData.isPlayer1Turn ? "player1" : "player2"}
          style={{ fontSize: sizeReference / 30 }}
        >
          Go again!
        </div>
      </div>
    </>
  );
}
