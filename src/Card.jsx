import { getBreed } from "./fetchImages";
import { useEffect } from "react";
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
}) {
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
        gameState.flip1 === cardData.id
      ) {
        incrementScore();
        setGameState({ ...gameState, flip1: "", flip2: "" });
      } else if (
        gameState.flip1 === cardData.id ||
        gameState.flip2 === cardData.id
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
    >
      <div className="flip-card-inner">
        <div className="flip-card-back">
          <img src={cardData.url} alt={getBreed(cardData)} />
        </div>
        <div className="flip-card-front">
          <h1>Puppy Memory</h1>
          <PawSVG />
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
