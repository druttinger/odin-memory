import React from "react";

export function CardSizer({ modalSize, setModalSize }) {
  const cards = [];
  for (let i = 1; i <= 15; i++) {
    cards.push(
      <div
        className={
          "settingCard" +
          (console.log(i, modalSize) || i <= modalSize ? " highlightCard" : "")
        }
        style={{
          transform:
            `rotate(${i * 10 - 70}deg) ` +
            `translatex(${i * 7 - 40}px) ` +
            `translatey(${i < 7 ? (i - 7) * -5 : (7 - i) * -4}px)`,
        }}
        key={i}
        onClick={() => setModalSize(i < 3 ? 3 : i)}
      >
        {i}
      </div>
    );
  }
  return (
    <ul className="cardSizer">
      {cards}
      <h1>{modalSize}</h1>
    </ul>
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
