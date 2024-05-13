import React from 'react';
import './basics.css';

const QuizCard = ({ question, options, onNextClick }) => {
  const handleOptionClick = (selectedOption) => {

    onNextClick();
  };

  return (
    <div className="full_Screen">
    <div className="quiz-card">
      <div className="quiz-question">{question}</div>
      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className="quiz-option"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default QuizCard;
