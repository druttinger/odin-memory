import React, { useEffect, useState } from "react";
import { fetchImages } from "./fetchImages";
import Card from "./Card";
import AiPlayer from "./AiPlayer";

export default function App() {
  const GAME_SIZE = 3;
  const [img, setImg] = useState([]);
  const [scoreData, setScoreData] = useState({
    player1: 0,
    player2: 0,
    currentPlayer: 0,
  });
  const [gameState, setGameState] = useState({
    flip1: "",
    flip2: "",
    awaitUpdate: false,
    playAI: true,
  });
  const [isActive, setIsActive] = useState(
    new Array(GAME_SIZE * 2).fill(false)
  );
  // const tempActive = [...isActive];
  const [weightMap, setWeightMap] = useState(AiPlayer.initAI(img));

  useEffect(() => {
    fetchImages(setImg, setWeightMap, GAME_SIZE);
  }, []);

  const setNthCardActive = (n, active) => {
    // const newActive = [...isActive];
    // tempActive[n] = active;
    setIsActive((tempActive) => {
      let newActive = [...tempActive];
      newActive[n] = active;
      return newActive;
    });
  };

  const aiTurn = () => {
    let [choice1, choice2] = AiPlayer.aiTurn(isActive, weightMap);
    setIsActive(choice1, true);
    setIsActive(choice2, true);
    setGameState({
      ...gameState,
      flip1: img[choice1].id,
      flip2: img[choice2].id,
    });
  };

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
            aiTurn={aiTurn}
          />
        ))}
      </div>
    </>
  );
}
