import { random } from "./fetchImages";

const AiPlayer = {
  initAI: (arr) => {
    const weightMap = {};
    for (let each of arr) {
      if (!weightMap[each.id]) weightMap[each.id] = {};
      const weightObj = weightMap[each.id];
      weightObj.weight1 = 0;
      weightObj.weight2 = 0;
      // console.log("Initializing", each.id, weightObj, each.order);
      if (weightObj.position1 === undefined) {
        weightObj.position1 = each.order;
      } else if (weightObj.position2 === undefined) {
        weightObj.position2 = each.order;
      } else {
        alert("Error: More than 2 positions");
      }
    }
    return weightMap;
  },

  // updateWeight: (weightMap, id) => {
  //   weightMap[id].weight++;
  // },

  aiTurn: (isActive, weightMap, img) => {
    console.log("weight object", weightMap);
    let choice1, choice2;
    let attempts = 0; // Failsafe counter
    const maxAttempts = 100; // Maximum allowed iterations
    // console.log("isActive", isActive);
    do {
      choice1 = pickFirstCard(isActive);
      choice2 = pickSecondCard(
        img[choice1].id,
        cardsLeft(isActive),
        weightMap,
        choice1,
        isActive
      );
      // console.log("Choices:", choice1, choice2);

      attempts++;
      if (attempts > maxAttempts) {
        console.error(
          "AI Turn: Exceeded maximum attempts to find valid cards."
        );
        break; // Exit the loop to prevent browser lockup
      }
    } while (isActive[choice1] || isActive[choice2] || choice1 === choice2);

    return [choice1, choice2];
  },
};
const pickFirstCard = (isActive) => {
  // console.log("Picking first card", isActive);
  return getNthCard(random(cardsLeft(isActive)), isActive);
};

const pickSecondCard = (id, cardsLeft, weightMap, currentChoice, isActive) => {
  console.log("weight map in pickSecondCard", id, weightMap);
  let weightObj = weightMap[id];
  console.log("weight object in pickSecondCard", weightObj);
  if (
    weightObj.position1 === currentChoice &&
    random(cardsLeft + weightObj.weight2) < weightObj.weight2
  ) {
    return weightObj.position2;
  } else if (
    weightObj.position2 === currentChoice &&
    random(cardsLeft + weightObj.weight1) < weightObj.weight1
  ) {
    return weightObj.position1;
  }

  return getNthCard(random(cardsLeft), isActive);
};

const getNthCard = (n, isActive) => {
  let i = 0;
  let j = 0;
  do {
    // console.log("Checking j, isActive[j], i, n", j, isActive[j], i, n);
    if (!isActive[j] && i === n) return j;
    if (!isActive[j]) i++;
    j++;
  } while (j < isActive.length);
};

const cardsLeft = (isActive) => {
  const cardsLeft = isActive.reduce((acc, each) => acc + (each ? 0 : 1), 0);
  // console.log("Cards Left", cardsLeft);
  return cardsLeft;
};

export default AiPlayer;
