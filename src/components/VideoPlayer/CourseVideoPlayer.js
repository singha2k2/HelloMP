import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function CourseVideoPlayer() {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=2NSiQPnrU98?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1"
        playing
        controls={false}
       height={"100vh"}
       width={"100%"}
        onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
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
    </>
  );
}

export default CourseVideoPlayer;
