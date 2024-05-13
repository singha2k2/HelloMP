import React, { useState } from "react";
import { images } from "./images";
import "./basics.css";
import QuizCard from "./quiz";
import ProgressBar from "../ui/progressBar";
import NavbarComponent from "../../navbar/navbar";
import Chatbot from "../../Dashboard/Chatbot";
import { useNavigate } from "react-router-dom";

function HiddenBlockWithContent({blockTitle}){
  return (
    <>
    <div style={{width:"100%" ,border:"1px solid white",borderRadius:"12px",color:"white"}} className="d-flex justify-content-center align-items-center">
<h5>{blockTitle}</h5>
    </div>
    </>
  )
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const goToNextImage = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const goToPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const toggleQuiz = () => {
    if (currentIndex === images.length) {
      showQuiz(true);
    }
    goToNextImage();
  };

  const currentImage = images[currentIndex];

  return (
    <>
    <NavbarComponent  isLogged={true}/>
    <div className="fullscreen">
      <ProgressBar currentIndex={currentIndex} totalImages={images.length} />

      <div className="course-view d-flex">
        <div className="image-container">
          <img src={currentImage} alt={` ${currentIndex + 1}`} />
          {showQuiz && (
            <QuizCard
              question="What is the capital of France?"
              options={["Paris", "London", "Berlin"]}
              onNextClick={goToNextImage}
            />
          )}
        </div>
        <div className="discuss-doubts">
<HiddenBlockWithContent blockTitle={"Ask Personal Assistant"} />
          <Chatbot />
        
        </div>
      </div>

      <div className="button-container">
        {!showQuiz && (
          <>
            <button
              className={currentIndex === 0 ? "hidebutton" : "prev-button"}
              onClick={goToPreviousImage}
            >
              Previous
            </button>
            <button
              className={
                currentIndex === images.length - 1
                  ? "hidebutton"
                  : "next-button"
              }
              onClick={toggleQuiz}
            >
              Next
              
            </button>

            <button
              className={
                currentIndex === images.length - 1
                  ? "next-button"
                  : "hidebutton"
              }
              onClick={()=>navigate("/learn-with-interaction")}
            >
              {currentIndex === images.length -1 ? "Proceed" : "Next"}
              
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
