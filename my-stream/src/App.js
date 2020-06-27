import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Webcam from "react-webcam";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  var keep = false;
  const webcamRef = React.useRef(null);

  // On Click
  const onClick = (img) => {
    socket.emit("image", img)
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      onClick(imageSrc);
      console.log(keep);
      if(keep){
        setTimeout(capture,34); 
      } 
    },
    [webcamRef]
  );


  const start = () => {
      keep = true;
      capture();
  }

  const stop = () => {
      keep = false;
    }

  

  return (
    <>
    <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={start}>Capture photo</button>
      <button onClick={stop}>Stop Analysis</button>
    </>
  );
};

export default App;