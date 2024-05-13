import React from "react";
import NavbarComponent from "../../navbar/navbar";
import { Button, ProgressBar } from "react-bootstrap";
import "./QuestionUi.css";
import QuizUi from "./quiz/QuizUi";

function QuestionUi() {
  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="dark-fullscreen">
        <h1>How does the class start in Java?</h1>
        <div className="fullcontainer">
        <img className="ms-5 w-60" src="./questions/cartoon-thinking.gif" alt="thinking-img" />
          <div className="quiz-container">
            <QuizUi />
            <QuizUi />
            <QuizUi />
          </div>
            <img className="ms-5 w-60" src="./questions/thinking.gif" alt="thinking-img" />
        </div>
        <div className="bottom-container">
        <Button variant="primary">Skip</Button>
        <Button variant="primary">Check</Button>
      </div>
      </div>
    </>
  );
}

export default QuestionUi;
