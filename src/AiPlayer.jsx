import { random } from "./fetchImages";

const AiPlayer = {
  initAI: (arr) => {
    const weightMap = {};
    for (let each of arr) {
      if (!weightMap[each.id]) weightMap[each.id] = {};
      const weightObj = weightMap[each.id];
      weightObj.weight1 = 0;
      weightObj.weight2 = 0;
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
    let choice1, choice2;
    let attempts = 0; // Failsafe counter
    const maxAttempts = 100; // Maximum allowed iterations
    do {
      choice1 = pickFirstCard(isActive, weightMap);
      choice2 = pickSecondCard(
        img[choice1].id,
        cardsLeft(isActive),
        weightMap,
        choice1,
        isActive
      );

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
const pickFirstCard = (isActive, weightMap) => {
  // return getNthCard(random(cardsLeft(isActive)), isActive);
  const choiceArray = new Array(isActive.length).fill(0);
  let randBase = 0;
  for (let each in weightMap) {
    if (
      weightMap[each].weight1 > 0 &&
      weightMap[each].weight2 > 0 &&
      !isActive[weightMap[each].position1]
    ) {
      choiceArray[weightMap[each].position1] = weightMap[each].weight1;
      choiceArray[weightMap[each].position2] = weightMap[each].weight2;
      randBase += weightMap[each].weight1 + weightMap[each].weight2;
    } else {
      if (weightMap[each].weight1 == 0) {
        choiceArray[weightMap[each].position1] = 1;
        randBase++;
      }
      if (weightMap[each].weight2 == 0) {
        choiceArray[weightMap[each].position2] = 1;
        randBase++;
      }
    }
  }
  randBase = random(randBase);
  for (let i = 0; i < choiceArray.length; i++) {
    randBase -= choiceArray[i];
    if (randBase < 0) {
      return i;
    }
  }
};

const pickSecondCard = (id, cardsLeft, weightMap, currentChoice, isActive) => {
  let weightObj = weightMap[id];
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
    if (!isActive[j] && i === n) return j;
    if (!isActive[j]) i++;
    j++;
  } while (j < isActive.length);
};

const cardsLeft = (isActive) => {
  const cardsLeft = isActive.reduce((acc, each) => acc + (each ? 0 : 1), 0);
  return cardsLeft;
};

export default AiPlayer;
