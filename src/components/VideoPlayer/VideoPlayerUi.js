import React, { useState, useEffect } from "react";
import CourseVideoPlayer from "./CourseVideoPlayer";
import "./VideoPlayerUi.css";
import SolveDoubt from "../Dashboard/AskDoubts";
import NavbarComponent from "../navbar/navbar";

const sections = [
  {
    title: "Section 1",
    items: ["Item 1", "Item 2", "Item 3"],
  },
  {
    title: "Section 2",
    items: ["Item 4", "Item 5", "Item 6"],
  },
];

function VideoPlayerUi() {
  const [completedItems, setCompletedItems] = useState(
    sections.map((section) => section.items.map(() => false))
  );

  const handleVideoEnd = (sectionIndex, itemIndex) => {
    const newCompletedItems = [...completedItems];
    newCompletedItems[sectionIndex][itemIndex] = true;
    setCompletedItems(newCompletedItems);
  };

  return (
    <>
      <NavbarComponent />
      <div className="video-player-ui">
        <div className="video-player">
          <div className="course-video-player">
            <CourseVideoPlayer onVideoEnd={() => handleVideoEnd(0, 0)} />
          </div>
          <div className="solve-doubt-container">
            <SolveDoubt />
          </div>
        </div>
        <div className="progress-modules">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <input
                      type="checkbox"
                      checked={completedItems[sectionIndex][itemIndex]}
                      readOnly
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoPlayerUi;
