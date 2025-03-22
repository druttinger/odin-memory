// import react, { useState } from "react";
import { getBreed } from "./fetchImages";
import { useState } from "react";
import { PawSVG } from "./pawSVG";

export default function Card({ imgData }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={"flip-card" + (isActive ? " active" : "")}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-back">
          <img src={imgData.url} alt={getBreed(imgData)} />
        </div>
        <div className="flip-card-front">
          <h1>Puppy Memory</h1>
          <PawSVG />
          {/* <img src="./assets/dog-paw-svgrepo-com.svg" alt="" /> */}
        </div>
      </div>
    </div>
  );
}
