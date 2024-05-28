import React from "react";
import NavbarComponent from "../../navbar/navbar";
import { Button } from "react-bootstrap";
import QuizUi from "./quiz/QuizUi";
import "./QuestionUi.css";
import { Link, useParams } from "react-router-dom";

function QuestionUi() {
  const { courseName } = useParams();

  const getQuestions = (courseName) => {
    switch (courseName) {
      case "LearnHelloWorld":
  return [
    {
      question: "What is the entry point method in a Java program?",
      correctAnswer: "public static void main(String[] args)",
      options: [
        "public static void start(String[] args)",
        "public void main()",
        "public static void main(String[] args)",
        "public static void run(String[] args)"
      ]
    },
    {
      question: "What does the 'public' keyword mean in 'public static void main(String[] args)'?",
      correctAnswer: "It means the method can be accessed from outside the class.",
      options: [
        "It means the method can only be accessed within the same package.",
        "It means the method can only be accessed by subclasses.",
        "It means the method can be accessed from outside the class.",
        "It means the method is not accessible."
      ]
    },
    {
      question: "Which data type represents an array of strings in Java?",
      correctAnswer: "String[]",
      options: [
        "Array<String>",
        "String[]",
        "StringList",
        "ArrayList<String>"
      ]
    }
    // Add more questions for LearnHelloWorld as needed
  ];
      case "LearnPolymorphism":
        return [
          {
            question: "What is polymorphism in object-oriented programming?",
            correctAnswer: "It refers to the ability of a method to take on multiple forms.",
            options: [
              "It refers to the ability to define multiple constructors in a class.",
              "It refers to the ability of an object to inherit from multiple classes.",
              "It refers to the ability of a method to take on multiple forms.",
              "It refers to the ability of a method to take on a single form."
            ]
          },
          {
            question: "What is polymorphism in object-oriented programming?",
            correctAnswer: "It refers to the ability of a method to take on multiple forms.",
            options: [
              "It refers to the ability to define multiple constructors in a class.",
              "It refers to the ability of an object to inherit from multiple classes.",
              "It refers to the ability of a method to take on multiple forms.",
              "It refers to the ability of a method to take on a single form."
            ]
          },
          {
            question: "What is polymorphism in object-oriented programming?",
            correctAnswer: "It refers to the ability of a method to take on multiple forms.",
            options: [
              "It refers to the ability to define multiple constructors in a class.",
              "It refers to the ability of an object to inherit from multiple classes.",
              "It refers to the ability of a method to take on multiple forms.",
              "It refers to the ability of a method to take on a single form."
            ]
          },
          // Add more questions for LearnPolymorphism as needed
        ];
      case "LearnEncapsulation":
        return [
          {
            question: "What is encapsulation in Java?",
            correctAnswer: "It is the bundling of data and methods that operate on the data into a single unit.",
            options: [
              "It is the process of exposing all class members as public.",
              "It is the bundling of data and methods that operate on the data into a single unit.",
              "It is the process of splitting a class into multiple smaller classes.",
              "It is the process of making all class members private."
            ]
          },
          {
            question: "What is encapsulation in Java?",
            correctAnswer: "It is the bundling of data and methods that operate on the data into a single unit.",
            options: [
              "It is the process of exposing all class members as public.",
              "It is the bundling of data and methods that operate on the data into a single unit.",
              "It is the process of splitting a class into multiple smaller classes.",
              "It is the process of making all class members private."
            ]
          },
          {
            question: "What is encapsulation in Java?",
            correctAnswer: "It is the bundling of data and methods that operate on the data into a single unit.",
            options: [
              "It is the process of exposing all class members as public.",
              "It is the bundling of data and methods that operate on the data into a single unit.",
              "It is the process of splitting a class into multiple smaller classes.",
              "It is the process of making all class members private."
            ]
          },
          // Add more questions for LearnEncapsulation as needed
        ];
      case "LearnAbstarction":
        return [
          {
            question: "What is abstraction in Java?",
            correctAnswer: "It is the process of hiding the implementation details and showing only the essential features of an object.",
            options: [
              "It is the process of making all class members private.",
              "It is the process of defining abstract methods in a class.",
              "It is the process of hiding the implementation details and showing only the essential features of an object.",
              "It is the process of exposing all class members as public."
            ]
          },
          {
            question: "What is abstraction in Java?",
            correctAnswer: "It is the process of hiding the implementation details and showing only the essential features of an object.",
            options: [
              "It is the process of making all class members private.",
              "It is the process of defining abstract methods in a class.",
              "It is the process of hiding the implementation details and showing only the essential features of an object.",
              "It is the process of exposing all class members as public."
            ]
          },
          {
            question: "What is abstraction in Java?",
            correctAnswer: "It is the process of hiding the implementation details and showing only the essential features of an object.",
            options: [
              "It is the process of making all class members private.",
              "It is the process of defining abstract methods in a class.",
              "It is the process of hiding the implementation details and showing only the essential features of an object.",
              "It is the process of exposing all class members as public."
            ]
          },
          // Add more questions for LearnAbstarction as needed
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions(courseName);

  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="dark-fullscreen">
       <h2 className="d-flex justify-content-center pt-3">Let's Revise</h2>
        <div className="fullcontainer">
          <img className="ms-5 w-60" src="/questions/cartoon-thinking.gif" alt="thinking-img" />
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
          <img className="ms-5 w-60" src="/questions/thinking.gif" alt="thinking-img" />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link to={"/dashboard-user"} className="btn btn-primary">Complete Module</Link>
          </div>
        
      </div>
    </>
  );
}

export default QuestionUi;
