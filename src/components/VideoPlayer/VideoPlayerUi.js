import React from "react";
import CourseVideoPlayer from "./CourseVideoPlayer";
import "./VideoPlayerUi.css";

function VideoPlayerUi() {
  return (
    <>
    <div style={{ height: "99vh" }} className="d-flex justify-content-center">
      <div className="player">
        <CourseVideoPlayer />
      </div>
      <div className="progress-modules" style={{ overflowY: "auto", maxHeight: "80vh", width: "300px" }}>
        {/* Example sections */}
        <div>
          <h3>Section 1</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            {/* Add more items as needed */}
          </ul>
        </div>
        <div>
          <h3>Section 2</h3>
          <ul>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            {/* Add more items as needed */}
          </ul>
        </div>
        {/* Add more sections as needed */}
      </div>
    </div>
  </>
  
  );
}

export default VideoPlayerUi;
