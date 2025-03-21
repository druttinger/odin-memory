const imageUrl = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=2';
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_6KSyVbwOR7P8NpBSP1t3br20A4J5KIv8FAgnPdF1aprMrnUXuh0Qxs4REWVihvEO"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

const fetchImages = async (setter) => {
    const res = await fetch(imageUrl, requestOptions);
    const resData = await res.json();
    console.log(resData);
    setter(resData);
}



const getBreed = (dogInfo) => {
  return dogInfo.breeds[0].name;
}

export { fetchImages, getBreed };