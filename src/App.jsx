import React, { useEffect, useState } from "react";
import { fetchImages } from "./fetchImages";
import Card from "./Card";

export default function App() {
  const [img, setImg] = useState([]);
  const [flip1, setFlip1] = useState("");
  const [flip2, setFlip2] = useState("");

  useEffect(() => {
    fetchImages(setImg);
  }, []);

  // const flipCompare = (id) => {
  //   if (!lastFlipped) {
  //     setLastFlipped(id);
  //     return false;
  //   } else {
  //     if (lastFlipped === id) {
  //       setLastFlipped("");
  //       return true;
  //     } else {
  //       setLastFlipped("");
  //       return false;
  //     }
  //   }
  // };

  return (
    <div className="gameBox">
      {img.map((imgData) => (
        <Card
          imgData={imgData}
          key={imgData.id + imgData.order}
          order={imgData.order}
          flip1={flip1}
          flip2={flip2}
          setFlip1={setFlip1}
          setFlip2={setFlip2}
          // lastFlipped={lastFlipped}
        />
      ))}
    </div>
  );
}
