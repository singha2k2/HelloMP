import React, { useState } from "react";

function QuizUi({ question,correctAnswer, options }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setAlert({ type: "success", message: "Correct Answer!" });
    } else {
      setAlert({ type: "danger", message: "Wrong Answer!" });
    }
  };

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
            width: "85%",
            margin: "15px",
            height: "85%",
            borderRadius: "20px",
            zIndex: 9999,
          }}
        >
          <h5 className="card-title">{question}</h5>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="btn btn-primary"
              style={{ display: "block", marginBottom: "10px" }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
    </div>
  );
}

export default QuizUi;
