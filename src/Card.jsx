import { getBreed } from "./fetchImages";
import { useEffect, useState } from "react";
import { PawSVG } from "./pawSVG";

export default function Card({
  cardData,
  scoreData,
  setScoreData,
  gameState,
  setGameState,
  isActive,
  setIsActive,
  incrementWeight,
  size,
}) {
  const [flippedBy, setFlippedBy] = useState("");

  function incrementScore() {
    setScoreData({
      ...scoreData,
      [scoreData.isPlayer1Turn ? "player1" : "player2"]:
        scoreData[scoreData.isPlayer1Turn ? "player1" : "player2"] + 1,
    });
  }

  useEffect(() => {
    //confirm that the turn has been taken
    if (isActive && gameState.flip1 && gameState.flip2) {
      if (
        gameState.flip1 === gameState.flip2 &&
        gameState.flip1 === cardData.id &&
        !flippedBy
      ) {
        setFlippedBy(scoreData.isPlayer1Turn ? "player1flip" : "player2flip");
        incrementScore();
        setGameState({ ...gameState, flip1: "", flip2: "" });
      } else if (
        // gameState.flip1 === cardData.id ||
        // gameState.flip2 === cardData.id
        !flippedBy
      ) {
        nextPlayer(setScoreData, !scoreData.isPlayer1Turn);
        setTimeout(() => {
          setIsActive(false);
          setGameState({ ...gameState, flip1: "", flip2: "" });
        }, 900);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.flip2]);

  const handleClick = () => {
    // this is what a player action looks like
    if (!gameState.flip1) {
      setFlip(cardData.id, "flip1");
      incrementWeight(cardData.id);
      setIsActive(true);
    }
    if (gameState.flip1 && !gameState.flip2) {
      setFlip(cardData.id, "flip2");
      incrementWeight(cardData.id);
      setIsActive(true);
    }
  };

  const setFlip = (id, flipName) => {
    setGameState({ ...gameState, [flipName]: id });
  };

  return (
    <div
      className={"flip-card" + (isActive ? " active" : "")}
      onClick={handleClick}
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
      }}
    >
      <div
        className="flip-card-inner"
        style={{
          borderRadius: size / 4,
        }}
      >
        <div
          className={"flip-card-back " + flippedBy}
          style={{
            borderRadius: size / 4,
          }}
        >
          <img
            src={cardData.url}
            alt={getBreed(cardData)}
            style={{
              borderRadius: size / 4,
            }}
          />
        </div>
        <div
          className="flip-card-front"
          style={{
            borderRadius: size / 4,
          }}
        >
          <h1 style={{ fontSize: Math.floor(size / 6) }}>Puppy Memory</h1>
          <PawSVG width={Math.floor(size / 3)} height={Math.floor(size / 3)} />
        </div>
      </div>
    </div>
  );
}

function nextPlayer(setScoreData, newIsPlayer1Turn) {
  setScoreData((scoreData) => {
    return {
      ...scoreData,
      isPlayer1Turn: newIsPlayer1Turn,
    };
  });
}
