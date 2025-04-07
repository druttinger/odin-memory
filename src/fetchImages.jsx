import AiPlayer from "./AiPlayer";

const imageUrl =
  "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=";
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key":
    "live_6KSyVbwOR7P8NpBSP1t3br20A4J5KIv8FAgnPdF1aprMrnUXuh0Qxs4REWVihvEO",
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

const fetchImages = async (setImg, size) => {
  console.log("this is getting called");
  const res = await fetch(imageUrl + size, requestOptions);
  const resData = await res.json();
  console.log("resData", resData);
  setImg(resData);
};

const mapCards = (resData, setCardMap, setWeightMap) => {
  const imgData = scrambleDogs(resData);
  setCardMap(imgData);
  setWeightMap(AiPlayer.initAI(imgData));
};

const scrambleDogs = (dogs) => {
  const dogArray = new Array(dogs.length * 2).fill(null);
  for (let each of dogs) {
    each.isFlipped = false;
    // have to call it twice to have pairs!
    randomDog(dogArray, each);
    randomDog(dogArray, each);
  }
  return dogArray;
};

const random = (max) => {
  return Math.floor(Math.random() * max);
};

const getBreed = (dogInfo) => {
  return dogInfo.breeds[0].name;
};

function randomDog(dogArray, dog) {
  while (true) {
    let randomIndex = random(dogArray.length);
    if (dogArray[randomIndex] === null) {
      dogArray[randomIndex] = { ...dog, order: randomIndex };
      break;
    }
  }
}

export { fetchImages, getBreed, mapCards, random };
