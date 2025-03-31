import React, { useEffect, useState, useCallback } from "react";
import { fetchImages } from "./fetchImages";
import Card from "./Card";
import AiPlayer from "./AiPlayer";

export default function App() {
  const GAME_SIZE = 9;
  const [img, setImg] = useState([]);
  const [scoreData, setScoreData] = useState({
    player1: 0,
    player2: 0,
    isPlayer1Turn: true,
  });
  const [gameState, setGameState] = useState({
    flip1: "",
    flip2: "",
    awaitUpdate: true,
    playAI: true,
    gameOver: false,
  });
  const [isActive, setIsActive] = useState(
    new Array(GAME_SIZE * 2).fill(false)
  );
  const [weightMap, setWeightMap] = useState({});

  const aiTurn = useCallback(() => {
    let [choice1, choice2] = AiPlayer.aiTurn(isActive, weightMap, img);
    setNthCardActive(choice1, true);
    setTimeout(() => {
      setNthCardActive(choice2, true);
      setGameState((prevState) => ({
        ...prevState,
        flip1: img[choice1].id,
        flip2: img[choice2].id,
      }));
      setWeightMap((prevWeightMap) => {
        prevWeightMap[img[choice1].id].weight1++;
        prevWeightMap[img[choice1].id].weight2++;
        prevWeightMap[img[choice2].id].weight1++;
        prevWeightMap[img[choice2].id].weight2++;
        // AiPlayer.updateWeight(prevWeightMap, img[choice1].id);
        // AiPlayer.updateWeight(prevWeightMap, img[choice2].id);
        return { ...prevWeightMap };
      });
    }, 500);
  }, [isActive, weightMap, img]);

  useEffect(() => {
    fetchImages(setImg, setWeightMap, GAME_SIZE);
  }, []);

  useEffect(() => {
    // Initialize the weightMap after images are fetched
    const initialWeightMap = AiPlayer.initAI(img);
    setWeightMap(initialWeightMap);
    setGameState((prevState) => ({
      ...prevState,
      awaitUpdate: false,
    }));
  }, [img]);

  useEffect(() => {
    let timeoutid;
    if (img.length > 0) {
      // Ensure the img array is fully loaded
      if (!scoreData.isPlayer1Turn && gameState.playAI && !checkGameOver()) {
        timeoutid = setTimeout(() => {
          aiTurn();
        }, 1100);
      }
    }
    return () => {
      clearTimeout(timeoutid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const setNthCardActive = (n, active) => {
    setIsActive((tempActive) => {
      let newActive = [...tempActive];
      newActive[n] = active;
      return newActive;
    });
  };

  const incrementWeight = (id) => {
    setWeightMap((prevWeightMap) => {
      const newWeightMap = { ...prevWeightMap };
      newWeightMap[id].weight1++;
      newWeightMap[id].weight2++;
      return newWeightMap;
    });
  };

  function checkGameOver() {
    if (isActive.every((each) => each)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div className="scoreBoard">
        <span className={scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
          Player 1: {scoreData.player1}
        </span>
        <span>{scoreData.currentPlayer ? " > " : " < "}</span>
        <span className={!scoreData.isPlayer1Turn ? "currentPlayer" : ""}>
          Player 2: {scoreData.player2}
        </span>
        {checkGameOver() ? (
          <span>
            Game Over.{" "}
            {scoreData.player1 === scoreData.player2
              ? "Draw!"
              : (scoreData.player1 > scoreData.player2
                  ? "Player 1"
                  : gameState.playAI
                  ? "The Computer"
                  : "Player 2") + " wins!"}
          </span>
        ) : null}
      </div>
      <div className="gameBox">
        {img.map((imgData) => (
          <Card
            imgData={imgData}
            key={imgData.id + imgData.order}
            order={imgData.order}
            scoreData={scoreData}
            setScoreData={setScoreData}
            gameState={gameState}
            setGameState={setGameState}
            isActive={isActive[imgData.order]}
            setIsActive={(active) => {
              setNthCardActive(imgData.order, active);
            }}
            incrementWeight={incrementWeight}
            aiTurn={aiTurn}
          />
        ))}
      </div>
    </>
  );
}
