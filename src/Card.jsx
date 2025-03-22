// import react, { useState } from "react";
import { getBreed } from "./fetchImages";
import { useEffect, useState } from "react";
import { PawSVG } from "./pawSVG";

export default function Card({ imgData, flip1, flip2, setFlip1, setFlip2 }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && flip1 && flip2) {
      if ((flip1 === imgData.id || flip2 === imgData.id) && flip1 !== flip2) {
        setTimeout(() => {
          setIsActive(false);
        }, 2000);
      }
      setFlip1("");
      setFlip2("");
    }
  }, [flip1, flip2, isActive, setFlip1, setFlip2, imgData.id]);

  const handleClick = () => {
    if (!flip1) {
      setFlip1(imgData.id);
      setIsActive(true);
    }
    if (flip1 && !flip2) {
      setFlip2(imgData.id);
      setIsActive(true);
    }
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
        </div>
      </div>
    </div>
  );
}
