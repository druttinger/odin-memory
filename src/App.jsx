import React, { useEffect, useState, useCallback } from "react";
import { fetchImages, mapCards } from "./fetchImages";
import AiPlayer from "./AiPlayer";
import { ScoreBoard } from "./ScoreBoard";
import SettingModal from "./SettingModal";
import { GameBox } from "./GameBox";
import Confetti from "react-confetti";

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
  });
  const [isActive, setIsActive] = useState(
    [false]
    // new Array(gameState.gameSize * 2).fill(false)
  );
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
    // console.log("initializing game part 1", gameState.gameSize);
    // setIsActive(new Array(gameState.gameSize * 2).fill(false));
    // if (img && img.length > 0 && img.length < gameState.gameSize)
    fetchImages(setImg, MAX_GAME_SIZE);
  }, []);

  // initialize cardMap and weightMap arrays
  useEffect(() => {
    // Initialize the weightMap after images are fetched
    console.log("initializing game part 2", img);
    if (!modalOpen)
      mapCards(img.slice(0, gameState.gameSize), setCardMap, setWeightMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, modalOpen]);

  //check to see if it is an AI turn
  useEffect(() => {
    console.log("checking for AI turn");
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

  function checkGameOver() {
    if (isActive.every((each) => each)) {
      // setGameState((prevState) => ({
      //   ...prevState,
      //   gameOver: true,
      // }));
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
          setGameState={setGameState}
          setScoreData={setScoreData}
          setCardMap={setCardMap}
          setWeightMap={setWeightMap}
          setIsActive={setIsActive}
          checkGameOver={checkGameOver}
        />
      ) : (
        ScoreBoard(
          scoreData,
          checkGameOver,
          gameState,
          modalOpen,
          setIsModalOpen
        )
      )}
      {checkGameOver() && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={(window.innerWidth * window.innerHeight) / 1000}
          recycle={false}
        />
      )}
      {GameBox(
        cardMap,
        scoreData,
        setScoreData,
        gameState,
        setGameState,
        isActive,
        setNthCardActive,
        incrementWeight,
        aiTurn
      )}
    </>
  );
}
