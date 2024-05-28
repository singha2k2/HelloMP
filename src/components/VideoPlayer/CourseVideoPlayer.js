import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

function CourseVideoPlayer({ videoUrls, onVideoEnd, currentVideoIndex }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0, "seconds");
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    onVideoEnd();
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "80%" }}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrls[currentVideoIndex]}
        playing
        controls
        height="100%"
        width="100%"
        onEnded={handleVideoEnd}
      />
    </div>
  );
}

export default CourseVideoPlayer;
