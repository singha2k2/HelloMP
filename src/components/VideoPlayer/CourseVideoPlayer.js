import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

function CourseVideoPlayer({ onVideoEnd }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentTime > 0 && currentTime % 15 === 0) {
      setPlaying(false);
      setShowPopup(true);
    }
  }, [currentTime]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setPlaying(true);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80%" }}>
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=2NSiQPnrU98?rel=0&version=3&autoplay=1&controls=0&showinfo=0&loop=1"
        playing={playing}
        controls={false}
        height="100%"
        width="100%"
        onProgress={(progress) => setCurrentTime(Math.floor(progress.playedSeconds))}
        onEnded={onVideoEnd}
      />
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          color: "white",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "5px",
        }}
      >
        {Math.floor(currentTime)} seconds
      </div>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        >
          <p>Time to take a break! Click to resume.</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CourseVideoPlayer;
