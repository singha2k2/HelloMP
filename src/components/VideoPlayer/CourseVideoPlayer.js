import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

function CourseVideoPlayer({ videoUrls, onVideoEnd }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentTime > 0 && currentTime % 60 === 0) {
      setPlaying(false);
      setShowPopup(true);
    }
  }, [currentTime]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setPlaying(true);
  };

  const handleVideoEnd = () => {
    onVideoEnd(currentVideoIndex);
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setCurrentTime(0); // Reset time for the new video
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80%" }}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrls[currentVideoIndex]}
        playing={playing}
        controls={false}
        height="100%"
        width="100%"
        onProgress={(progress) => setCurrentTime(Math.floor(progress.playedSeconds))}
        onEnded={handleVideoEnd}
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
