import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, boxes }) => {
    
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="image" alt="" src={imageUrl} width="500px" heigh="auto" />
        {boxes.map((box, index) => {
            console.log(`box from FaceDetection: ${boxes}`);
          return (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceDetection;
