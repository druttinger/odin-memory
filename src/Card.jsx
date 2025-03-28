import { getBreed } from "./fetchImages";
import { useCallback, useEffect } from "react";
import { PawSVG } from "./pawSVG";
import AiPlayer from "./AiPlayer";

export default function Card({
  imgData,
  scoreData,
  setScoreData,
  gameState,
  setGameState,
  isActive,
  setIsActive,
  aiTurn,
}) {
  const resetFlip = useCallback(() => {
    if (
      (gameState.flip1 === imgData.id || gameState.flip2 === imgData.id) &&
      gameState.flip1 !== gameState.flip2
    ) {
      nextTurn();
    } else {
      setScoreData({
        ...scoreData,
        [scoreData.currentPlayer ? "player2" : "player1"]:
          scoreData[scoreData.currentPlayer ? "player2" : "player1"] + 1,
      });
    }
    setGameState({ ...gameState, flip1: "", flip2: "" });

    function nextTurn() {
      nextPlayer(setScoreData);
      console.log("Next Player", scoreData.currentPlayer);
      if (gameState.playAI && scoreData.currentPlayer === 1) {
        aiTurn();
        nextPlayer(setScoreData);
      }
      setTimeout(() => {
        // console.log("Not a match.  Resetting.", isActive);
        setIsActive(false);
      }, 2000);
    }
  }, [
    imgData.id,
    gameState,
    setGameState,
    scoreData,
    setScoreData,
    setIsActive,
    aiTurn,
  ]);

  useEffect(() => {
    if (isActive && gameState.flip1 && gameState.flip2) {
      resetFlip();
    }
  }, [gameState, isActive, resetFlip, imgData]);

  const handleClick = () => {
    // if (!gameState.awaitUpdate) {
    // this is what a player action looks like
    if (!gameState.flip1) {
      setFlip(imgData.id, "flip1");
      setIsActive(true);
    }
    if (gameState.flip1 && !gameState.flip2) {
      setFlip(imgData.id, "flip2");
      setIsActive(true);
    }
    // }
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
function nextPlayer(setScoreData) {
  setScoreData((scoreData) => {
    return {
      ...scoreData,
      currentPlayer: scoreData.currentPlayer === 0 ? 1 : 0,
    };
  });
}
