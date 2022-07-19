import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [videoStream, setVideoStream] = useState(null);
  const videoElement = useRef(null);

  useEffect(() => {
    (async function () {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia();
      setVideoStream(mediaStream);
      videoElement.current.onloadedmetadata = () => {
        videoElement.current.play();
      }
    })();
  }, []);

  useEffect(() => {
    if (!videoElement.current) {
      return;
    }
    videoElement.current.srcObject = videoStream;
  }, [videoStream, videoElement]);

  async function handleClick() {
      await videoElement.current.requestPictureInPicture();
  }

  return (
    <div>
      {/* Video */}
      <video controls height="360" width="640" ref={videoElement} hidden></video>
      {/* Button */}
      <div className="button-container">
        <button onClick={handleClick}>START</button>
      </div>
    </div>
  );
}

export default App;
