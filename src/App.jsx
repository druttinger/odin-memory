import React, { useEffect, useState } from "react";
import { getBreed, fetchImages } from "./fetchImages";

export default function App() {
  const [img, setImg] = useState([]);


  useEffect(() => {
    fetchImages(setImg);
  }, []);

  return (
    <>
      {img.map((imgData) => (<img key={imgData.id} src={imgData.url} 
        alt={getBreed(imgData)} />))}
    </>
  );
}
