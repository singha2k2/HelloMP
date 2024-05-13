import React, { useState } from "react";


function QuizUi() {
  const [isEnrolled, setIsEnrolled] = useState(false);

  return (
    

   
    <div className="quiz-container">
      <div
        className="card"
        onMouseEnter={() => setIsEnrolled(true)}
        onMouseLeave={() => setIsEnrolled(false)}
      >
        <img
          className="card-img-top"
          src="https://cdn.pixabay.com/photo/2023/04/28/08/07/ai-generated-7956090_1280.jpg"
          alt="Card image cap"
        />

        <div
          className={`card-body ${isEnrolled ? "enrolled" : ""}`}
          style={{
            border: "1px solid rgb(228, 228, 228)",
            boxShadow: "5px 5px 15px rgb(174, 173, 173)",
            width: "10rem",
            margin: "15px",
            height: "85%",
            borderRadius: "20px",
            zIndex: 9999,
          }}
        >
          <h5 className="card-title">Heading</h5>
        </div>
     
    </div>
    </div>
  );
}

export default QuizUi;
