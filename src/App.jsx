import React, { useEffect, useState, useCallback } from "react";
import { fetchImages, mapCards, shuffleArray } from "./fetchImages";
import AiPlayer from "./AiPlayer";
import { ScoreBoard } from "./ScoreBoard";
import SettingModal from "./SettingModal";
import { GameBox } from "./GameBox";
import DisplayMatch from "./DisplayMatch";
// import DisplayGameOver from "./DisplayGameOver";
const DisplayGameOver = React.lazy(() => import("./DisplayGameOver"));

export default function App() {
  const DEFAULT_GAME_SIZE = 9;
  const MAX_GAME_SIZE = 15;
  const [img, setImg] = useState([]);
  const [cardMap, setCardMap] = useState([]);
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
    gameSize: DEFAULT_GAME_SIZE,
    matchState: true,
  });
  const [isActive, setIsActive] = useState([false]);
  const [weightMap, setWeightMap] = useState({});
  const [modalOpen, setIsModalOpen] = useState(true);

  const aiTurn = useCallback(() => {
    let [choice1, choice2] = AiPlayer.aiTurn(isActive, weightMap, cardMap);
    setNthCardActive(choice1, true);
    setTimeout(() => {
      setNthCardActive(choice2, true);
      setGameState((prevState) => ({
        ...prevState,
        flip1: cardMap[choice1].id,
        flip2: cardMap[choice2].id,
      }));
      setWeightMap((prevWeightMap) => {
        prevWeightMap[cardMap[choice1].id].weight1++;
        prevWeightMap[cardMap[choice1].id].weight2++;
        prevWeightMap[cardMap[choice2].id].weight1++;
        prevWeightMap[cardMap[choice2].id].weight2++;
        return { ...prevWeightMap };
      });
    }, 500);
  }, [isActive, weightMap, cardMap]);

  // fetch images for max game size
  useEffect(() => {
    fetchImages(setImg, MAX_GAME_SIZE);
  }, []);

  // initialize cardMap and weightMap arrays
  useEffect(() => {
    // Initialize the weightMap after images are fetched
    if (!modalOpen && img && img.length > 0 && cardMap.length === 0) {
      mapCards(
        // mix up the images for variety, but skip if all are getting used
        gameState.gameSize !== 15 ? shuffleArray(img, gameState.gameSize) : img,
        setCardMap,
        setWeightMap
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, modalOpen, cardMap]);

  //check to see if it is an AI turn
  useEffect(() => {
    let timeoutid;
    if (cardMap.length > 0) {
      // Ensure cardMap array is fully loaded
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

  const resetGame = (playAI, gameSize) => {
    setIsModalOpen(true);
    setIsModalOpen(false);
    setGameState({
      ...gameState,
      flip1: "",
      flip2: "",
      awaitUpdate: true,
      gameSize: gameSize ?? gameState.gameSize,
      playAI: playAI ?? gameState.playAI,
      gameOver: false,
      matchState: false,
    });
    setScoreData({ player1: 0, player2: 0, isPlayer1Turn: true });
    setCardMap([]);
    setWeightMap({});
    setIsActive(new Array((gameSize ?? gameState.gameSize) * 2).fill(false));
  };

  function checkGameOver() {
    if (isActive.every((each) => each)) {
      // setGameMessage(["Game Over", scoreData.isPlayer1Turn]);
      return true;
    }
    return false;
  }

  return (
    <>
      {modalOpen ? (
        <SettingModal
          setIsModalOpen={setIsModalOpen}
          modalOpen={modalOpen}
          gameState={gameState}
          checkGameOver={checkGameOver}
          resetGame={resetGame}
        />
      ) : checkGameOver() ? (
        <DisplayGameOver
          scoreData={scoreData}
          resetGame={resetGame}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <ScoreBoard
          scoreData={scoreData}
          checkGameOver={checkGameOver}
          gameState={gameState}
          modalOpen={modalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {gameState.matchState && !modalOpen && !checkGameOver() && (
        <DisplayMatch
          scoreData={scoreData}
          endAnimation={() => setGameState({ ...gameState, matchState: false })}
        />
      )}
      <GameBox
        cardMap={cardMap}
        scoreData={scoreData}
        setScoreData={setScoreData}
        gameState={gameState}
        setGameState={setGameState}
        isActive={isActive}
        setNthCardActive={setNthCardActive}
        incrementWeight={incrementWeight}
        modalOpen={modalOpen}
        aiTurn={aiTurn}
      />
    </>
  );
}
