import React, { useState } from "react";
import CourseVideoPlayer from "./CourseVideoPlayer";
import "./VideoPlayerUi.css";
import NavbarComponent from "../navbar/navbar";
import { Link, useParams } from "react-router-dom";



function VideoPlayerUi({sections}) {
  const courseName = useParams();
  
  const [completedItems, setCompletedItems] = useState(
    sections.map((section) => section.items.map(() => false))
  );
  const [currentVideo, setCurrentVideo] = useState({
    sectionIndex: 0,
    itemIndex: 0,
  });

  const handleVideoEnd = () => {
    const { sectionIndex, itemIndex } = currentVideo;
    setCompletedItems((prevCompletedItems) => {
      const newCompletedItems = prevCompletedItems.map((section, sIdx) => {
        if (sIdx === sectionIndex) {
          return section.map((item, iIdx) => (iIdx === itemIndex ? true : item));
        }
        return section;
      });
      return newCompletedItems;
    });
  };

  const handleItemClick = (sectionIndex, itemIndex) => {
    setCurrentVideo({ sectionIndex, itemIndex });
  };

  const videoUrls = sections.flatMap((section) =>
    section.items.map((item) => item.url)
  );

  const currentVideoIndex =
    currentVideo.sectionIndex * sections[0].items.length + currentVideo.itemIndex;

  return (
    <>
      <div style={{ color: "black", fontSize: "large", fontStyle: "italic", background: "linear-gradient(135deg, #153677, #4e085f)" }}>
        <NavbarComponent isLogged={true} />
        <div className="video-player-ui">
          <div className="video-player">
            <div className="course-video-player">
              <CourseVideoPlayer
                videoUrls={videoUrls}
                onVideoEnd={handleVideoEnd}
                currentVideoIndex={currentVideoIndex}
              />
            </div>
          </div>
          <div className="progress-modules">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="section">
                <h3>{section.title}</h3>
                <div className="items-container">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`item-label ${completedItems[sectionIndex][itemIndex] ? "completed" : ""}`}
                      onClick={() => handleItemClick(sectionIndex, itemIndex)}
                    >
                      {item.item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Link className="btn btn-success" to={`/doulingo-test/${courseName.courseName}`}>Proceed to Practice</Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default VideoPlayerUi;
