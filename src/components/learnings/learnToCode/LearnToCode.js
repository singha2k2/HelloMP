import React, { useState, useEffect } from "react";
import NavbarComponent from "../../navbar/navbar";
import JavaCodeCompiler from "../../codeCompilers/javaCodeCompiler/javaCodeCompiler";
import { defaultCode } from "../../codeCompilers/javaCodeCompiler/javaCodeCompiler";
import InitialCodePractice from "../userinteraction/InitialCodePractice";

function LearnToCode() {
  const [testCode, setTestCode] = useState(defaultCode);
  const [incorrectCount, setIncorrectCount] = useState(2);
  const [hintModal, setHintModal] = useState(false);
  const [tryAgainFlag, setTryAgainFlag] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListComplete, setListComplete] = useState(false);
  const [questionsList, setQuestionList] = useState([
    {
      id: 1,
      question:
        'Class should start with "Class" Keyword with "Name of Class -> Car in this case with block ("{ "})"',
      answer: "Class Car {}",
      divTitle:"Class Car"
    },
    {
      id: 2,
      question:
        'Within the (block){} of class make first "private"  variable named "weight" of type "double... "Note:Initilisation of global variable is optional so, do not initilise and do not forgot to close using ;"',
      answer: "private double weight;",
      divTitle:"Variable : Weight"
    },
    {
      id: 3,
      question:
        'Within the (block){} of class make second "private"  variable named "color" of type "String... "Note:Initilisation of global variable is optional so, do not initilise and do not forgot to close using ;"',
      answer: "private String color;",
      divTitle:"Variable : Color"
    },
    {
      id: 4,
      question:
        'Within the (block){} of class make first "public" method named "drive" of type return type "void... "Write System.out.println("I am driving a car"); in method"',
      answer: "public void drive(){System.out.println(\"I am driving a car\");};",
      divTitle:"Method : drive + void"
    }
  ]);

  useEffect(() => {
    setTestCode(
      `// Do not Repeat this code write the logic below the linen` +
        `public class Main{` +
        `public static void main(String args[]){` +
        `Car car = new Car();` +
        `car.drive();` +
        `} ` +
        `}n` +
        `---------------------------Question--------------------\n` +
        `Create a Class named Car with two private datamembers weight and color ,, write one method drive and print` +
        `\"I am Driving a Car\"\n` +
        `---------------------------Write Your Code Below This Line--------------\n`
    );
  }, []);

  const handleAnswerSubmit = (answer) => {
    const currentQuestion = questionsList[currentQuestionIndex];
    if (answer.trim() === currentQuestion.answer.trim()) {
      // Correct answer, move to the next question
      if (currentQuestionIndex < questionsList.length - 1) {
        setIncorrectCount(2);
        setTryAgainFlag(false);
        setHintModal(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIncorrectCount(2);
        setTryAgainFlag(false);
        setHintModal(false);
        setListComplete(true);
      }
    } else {
      setIncorrectCount((count) => (count = count + 1));
      setTryAgainFlag(true);
      if (incorrectCount > 5) {
        setHintModal(true);
      }
    }
  };

  const renderDiv = () => {
    if (currentQuestionIndex === questionsList.length - 1) {
      return (
        <div className="simulator-box">
          <h1>{questionsList[currentQuestionIndex].divTitle}</h1>
          {Array.from({ length: questionsList.length - 1 }, (_, index) => (
            <div key={index + 1} className="nested-simulator-box">
              <p>{questionsList[index + 1].divTitle}</p>
            </div>
          ))}
        </div>
      );
    }
  
    return (
      <div className="simulator-box">
        <h1>{questionsList[currentQuestionIndex].divTitle}</h1>
        {Array.from({ length: currentQuestionIndex }, (_, index) => (
          <div key={index} className="nested-simulator-box">
            <p>{questionsList[index].divTitle}</p>
          </div>
        ))}
      </div>
    );
  };
  
  

  
  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="d-flex w-100 h-100 learn_to_code_bg">
        <div className="first_box_compiler">
          {currentQuestionIndex < questionsList.length && (
            <InitialCodePractice
              question={questionsList[currentQuestionIndex]}
              onAnswerSubmit={handleAnswerSubmit}
              hintModalStatus={hintModal}
              tryAgainFlag={tryAgainFlag}
              isListComplete={isListComplete}
            />
          )}
          {/* <JavaCodeCompiler embeddedCode={testCode} /> */}
        </div>
        <div className="first_box_output d-flex justify-content-center align-items-center flex-wrap">
          {renderDiv()}
        </div>
      </div>
    </>
  );
}

export default LearnToCode;
