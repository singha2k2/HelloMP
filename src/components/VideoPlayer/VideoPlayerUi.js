import React, { useState } from "react";
import CourseVideoPlayer from "./CourseVideoPlayer";
import "./VideoPlayerUi.css";
import SolveDoubt from "../Dashboard/AskDoubts";
import NavbarComponent from "../navbar/navbar";

const sections = [
  {
    title: "Section 1",
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  },
  {
    title: "Section 2",
    items: ["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"],
  },
];

const videoUrls = [
  //"https://www.youtube.com/watch?v=2NSiQPnrU98?rel=0&version=3&autoplay=1&controls=0&showinfo=0&loop=1",
  "https://www.youtube.com/watch?v=Y-ubmaLsd5E&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5",
  "https://www.youtube.com/watch?v=G81hoJTvQVg&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=2",
  "https://www.youtube.com/watch?v=5Bp6GLU6HKE&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=3",
  "https://www.youtube.com/watch?v=KYogNWbjZIU&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=4",
  "https://www.youtube.com/watch?v=gZ1KbP2J2PA&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=5",
  "https://www.youtube.com/watch?v=Hh723SKuxZs&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=6",
  "https://www.youtube.com/watch?v=upQu_brz7OI&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=7",
  "https://www.youtube.com/watch?v=4f82EYG81c0&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=8",
  "https://www.youtube.com/watch?v=_sEcUuGcAKQ&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=9",
  "https://www.youtube.com/watch?v=4PGmawV0aA4&list=PLrKBFf87Cy9CHAyhX9l0rhktvg3pCG5R5&index=10",
  
];

function VideoPlayerUi() {
  const [completedItems, setCompletedItems] = useState(
    sections.map((section) => section.items.map(() => false))
  );

  const handleVideoEnd = (videoIndex) => {
    // Determine which section and item the video corresponds to
    const sectionIndex = Math.floor(videoIndex / 5);
    const itemIndex = videoIndex % 5;
  
    // Update the state to mark the item as completed
    setCompletedItems((prevCompletedItems) => {
      // Create a new array to avoid mutating the previous state directly
      const newCompletedItems = prevCompletedItems.map((section, idx) => {
        // Check if this is the section we need to update
        if (idx === sectionIndex) {
          // Create a new section array where the specific item is marked as completed
          return section.map((item, i) => (i === itemIndex ? true : item));
        }
        // Return the section unchanged if it's not the one we need to update
        return section;
      });
      // Return the updated array to set the new state
      return newCompletedItems;
    });
  };
  

  return (
    <>
      <NavbarComponent />
      <div className="video-player-ui">
        <div className="video-player">
          <div className="course-video-player">
            <CourseVideoPlayer videoUrls={videoUrls} onVideoEnd={handleVideoEnd} />
          </div>
        </div>
        <div className="progress-modules">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              <h3>{section.title}</h3>
              <div className="items-container">
                {section.items.map((item, itemIndex) => (
                  <label key={itemIndex} className="item-label">
                    
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoPlayerUi;
