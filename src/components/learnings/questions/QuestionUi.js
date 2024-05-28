import React from "react";
import NavbarComponent from "../../navbar/navbar";
import { Button } from "react-bootstrap";
import QuizUi from "./quiz/QuizUi";
import "./QuestionUi.css";
import { Link } from "react-router-dom";

function QuestionUi() {
  const questions = [
    {
      question : "How to start the class in java ?",
      correctAnswer: "public class",
      options: ["public class", "private class", "protected class", "class"]
    },
    {
      question : "How to start the class in java ?",
      correctAnswer: "Option 2",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    {
      question : "How to start the class in java ?",
      correctAnswer: "Option 3",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
  ];

  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="dark-fullscreen">
       <h2 className="d-flex justify-content-center pt-3">Lets Revise</h2>
        <div className="fullcontainer">
          <img className="ms-5 w-60" src="./questions/cartoon-thinking.gif" alt="thinking-img" />
          <div className="quiz-container">
            {questions.map((question, index) => (
              <QuizUi
              question={question.question}
                key={index}
                correctAnswer={question.correctAnswer}
                options={question.options}
              />
            ))}
          </div>
          <img className="ms-5 w-60" src="./questions/thinking.gif" alt="thinking-img" />
        </div>
        <div className="bottom-container">
          <Link to={"/"} className="btn btn-primary">Proceed</Link>
         
          
        </div>
      </div>
    </>
  );
}

export default QuestionUi;
