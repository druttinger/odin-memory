import React, { useEffect, useState, useCallback } from "react";
import { fetchImages } from "./fetchImages";
import Card from "./Card";
import AiPlayer from "./AiPlayer";

export default function App() {
  const GAME_SIZE = 6;
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
    console.log("AI Turn", isActive);
    let [choice1, choice2] = AiPlayer.aiTurn(isActive, weightMap, img);
    setNthCardActive(choice1, true);
    setNthCardActive(choice2, true);
    // console.log(img[choice1], img[choice2], img);
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
  }, [isActive, weightMap, img]);

  useEffect(() => {
    fetchImages(setImg, setWeightMap, GAME_SIZE);
    //disable linter as this should only be called once
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Initialize the weightMap after images are fetched
    const initialWeightMap = AiPlayer.initAI(img);
    console.log("Initial weightMap", initialWeightMap, img);
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
      console.log(
        "checking for AI turn",
        scoreData.isPlayer1Turn,
        gameState.playAI,
        checkGameOver()
      );
      if (!scoreData.isPlayer1Turn && gameState.playAI && !checkGameOver()) {
        timeoutid = setTimeout(() => {
          console.log("AI Turn triggered", isActive);
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
      console.log("Incrementing weight", id);
      const newWeightMap = { ...prevWeightMap };
      newWeightMap[id].weight1++;
      newWeightMap[id].weight2++;
      return newWeightMap;
    });
  };

  function checkGameOver() {
    if (isActive.every((each) => each)) {
      console.log("Game Over");
      return true;
    }
    return false;
  }

  return (
    <>
      <div className="scoreBoard">
        <span className={scoreData.currentPlayer ? "currentPlayer" : ""}>
          Player 1: {scoreData.player1}
        </span>
        <span>{scoreData.currentPlayer ? " > " : " < "}</span>
        <span className={!scoreData.currentPlayer ? "currentPlayer" : ""}>
          Player 2: {scoreData.player2}
        </span>
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
