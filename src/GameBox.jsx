import React from "react";
import Card from "./Card";
const countArray = [
  [3, 2, 0.075],
  [4, 3, 0.075],
  [6, 3, 0.075],
  [6, 4, 0.075],
  [6, 5, 0.075],
];

export function GameBox(
  cardMap,
  scoreData,
  setScoreData,
  gameState,
  setGameState,
  isActive,
  setNthCardActive,
  incrementWeight,
  aiTurn
) {
  const [gameBoxInfo, setGameBoxInfo] = React.useState({
    size: window.innerWidth / 3 - 20,
    xCount: 3,
    yCount: 2,
    spacing: 0.15,
  });

  React.useEffect(() => {
    const handleResize = () => {
      let newXCount, newYCount, newSpacing;

      if (window.innerWidth > window.innerHeight - 200)
        [newXCount, newYCount, newSpacing] =
          countArray[gameState.gameSize / 3 - 1];
      else
        [newYCount, newXCount, newSpacing] =
          countArray[gameState.gameSize / 3 - 1];
      const tempInfo = {
        size: Math.min(
          Math.floor(window.innerWidth / newXCount),
          Math.floor(window.innerHeight / newYCount)
        ),
        xCount: newXCount,
        yCount: newYCount,
        spacing: newSpacing,
      };
      console.log(
        "tempInfo",
        tempInfo.size,
        window.innerWidth,
        newXCount,
        window.innerHeight,
        newYCount
      );
      setGameBoxInfo(tempInfo);
      // setWidth(window.innerWidth);
      // setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gameState]);

  return (
    <div
      className="gameBox"
      style={{
        // width: gameBoxInfo.size * gameBoxInfo.xCount,
        // height: gameBoxInfo.size * gameBoxInfo.yCount,
        gridTemplateColumns: `repeat(${gameBoxInfo.xCount}, ${gameBoxInfo.size}px)`,
        gridTemplateRows: `repeat(${gameBoxInfo.yCount}, ${gameBoxInfo.size}px)`,
        gap: `${gameBoxInfo.spacing * gameBoxInfo.size}px`,
      }}
    >
      {cardMap.map((cardData) => (
        <Card
          cardData={cardData}
          key={cardData.id + cardData.order}
          order={cardData.order}
          scoreData={scoreData}
          setScoreData={setScoreData}
          gameState={gameState}
          setGameState={setGameState}
          isActive={isActive[cardData.order]}
          setIsActive={(active) => {
            setNthCardActive(cardData.order, active);
          }}
          incrementWeight={incrementWeight}
          aiTurn={aiTurn}
          size={gameBoxInfo.size * (1 - gameBoxInfo.spacing)} // size of the card
        />
      ))}
    </div>
  );
}
