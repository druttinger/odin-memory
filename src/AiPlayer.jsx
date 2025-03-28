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

  updateWeight: (weightMap, id) => {
    weightMap[id].weight++;
  },

  aiTurn: (isActive, weightMap) => {
    console.log("The Robots are taking over!");
    let choice1, choice2;
    do {
      choice1 = pickFirstCard(isActive);
      choice2 = pickSecondCard(
        isActive[choice1],
        cardsLeft(isActive),
        weightMap,
        choice1,
        isActive
      );
    } while (isActive[choice1] || isActive[choice2] || choice1 === choice2);
    return [choice1, choice2];
  },
};
const pickFirstCard = (isActive) => {
  return getNthCard(random(cardsLeft(isActive)), isActive);
};

const pickSecondCard = (id, cardsLeft, weightMap, currentChoice, isActive) => {
  // let weightObj = weightMap[id];
  console.log(weightMap, id, cardsLeft, currentChoice);
  return getNthCard(random(cardsLeft), isActive);
  // if (weightObj.weight1 === 0) {
  //   return random(cardsLeft);
  // }
  // let choice = random(cardsLeft + weightMap[id].weight);
  // if (choice < weightMap[id].weight1) {
  //   return weightMap[id].position1 === currentChoice
  //     ? weightMap[id].position2
  //     : weightMap[id].position1;
  // }
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
  isActive.reduce((acc, each) => acc + (each ? 1 : 0), 0);
};

export default AiPlayer;
