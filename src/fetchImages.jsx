const imageUrl =
  "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=9";
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

const fetchImages = async (setter) => {
  const res = await fetch(imageUrl, requestOptions);
  const resData = await res.json();
  setter(scrambleDogs(resData));
};

const scrambleDogs = (dogs) => {
  const dogArray = new Array(dogs.length * 2).fill(null);
  for (let each of dogs) {
    // have to call it twice to have pairs!
    randomDog(dogArray, each, "-1");
    randomDog(dogArray, each, "-2");
  }
  return dogArray;
};

const random = (max) => {
  return Math.floor(Math.random() * max);
};

const getBreed = (dogInfo) => {
  return dogInfo.breeds[0].name;
};

function randomDog(dogArray, dog, id) {
  while (true) {
    let randomIndex = random(dogArray.length);
    if (dogArray[randomIndex] === null) {
      dogArray[randomIndex] = { ...dog, id: dog.id + id };
      break;
    }
  }
}

export { fetchImages, getBreed };
