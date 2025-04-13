import React from "react";
import { PawSVG } from "./pawSVG";

export function CardSizer({ modalSize, setModalSize }) {
  const cards = [];
  for (let i = 3; i <= 15; i += 3) {
    cards.push(
      <div key={i} className="cardGroup" onClick={() => setModalSize(i)}>
        <div
          className={"settingCard" + (i <= modalSize ? " highlightCard" : "")}
          style={{
            transform: `rotate(${i * 6 - 60}deg) `,
          }}
        ></div>
        <div
          className={"settingCard" + (i <= modalSize ? " highlightCard" : "")}
          style={{
            transform: `rotate(${i * 6 - 54}deg) `,
          }}
        ></div>
        <div
          className={"settingCard" + (i <= modalSize ? " highlightCard" : "")}
          style={{
            transform: `rotate(${i * 6 - 48}deg) `,
          }}
        >
          {i}
        </div>
      </div>
    );
  }
  return (
    <div className="cardSizer">
      {cards}
      <h1>{modalSize}</h1>
      <PawSVG width="20" height="20" />
    </div>
  );
  // return (
  //   <label>
  //     <input
  //       type="number"
  //       value={modalSize}
  //       min="3"
  //       max="20"
  //       onChange={(e) => {
  //         setModalSize(e.target.value);
  //       }}
  //       onBlur={(e) => {
  //         const newSize = Math.max(3, Math.min(20, e.target.value)); // Clamp value between 3 and 20
  //         setModalSize(newSize);
  //       }}
  //     />
  //     Game Size (3-20)
  //   </label>
  // );
}
