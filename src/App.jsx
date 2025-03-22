import React, { useEffect, useState } from "react";
import { fetchImages } from "./fetchImages";
import Card from "./Card";

export default function App() {
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetchImages(setImg);
  }, []);

  return (
    <div className="gameBox">
      {img.map((imgData) => (
        <Card imgData={imgData} key={imgData.id} />
      ))}
    </div>
  );
}
