// import React, { useState } from 'react';
// import './style.css'; // Assuming you have a CSS file named 'style.css'

// const questions = [
//     {
//         question: "Which is the largest animal in the world?",
//         answers: [
//             { text: "Shark", correct: false },
//             { text: "Blue Whale", correct: true },
//             { text: "Elephant", correct: false },
//             { text: "Giraffe", correct: false }
//         ]
//     },
//     {
//         question: "Which is the smallest continent in the world?",
//         answers: [
//             { text: "Asia", correct: false },
//             { text: "Australia", correct: true },
//             { text: "Arctic", correct: false },
//             { text: "Africa", correct: false }
//         ]
//     },
//     {
//         question: "Which is the largest desert in the world?",
//         answers: [
//             { text: "Kalahari", correct: false },
//             { text: "Gobi", correct: false },
//             { text: "Sahara", correct: false },
//             { text: "Antarctica", correct: true }
//         ]
//     }
// ];

// function QuizApp() {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);

//     const startQuiz = () => {
//         setCurrentQuestionIndex(0);
//         setScore(0);
//     };

//     const handleNextButton = () => {
//         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     };

//     const selectAnswer = (isCorrect) => {
//         if (isCorrect) {
//             setScore(prevScore => prevScore + 1);
//         }
//         handleNextButton();
//     };

//     const showScore = () => {
//         return (
//             <div>
//                 <h2>You scored {score} out of {questions.length}</h2>
//                 <button onClick={startQuiz}>Play Again</button>
//             </div>
//         );
//     };

//     const currentQuestion = questions[currentQuestionIndex];

//     return (
//         <div className="app">
//             <h1>Simple Quiz Question</h1>
//             <div className="quiz">
//                 <h2 id="question">{currentQuestion.question}</h2>
//                 <div id="answer-buttons">
//                     {currentQuestion.answers.map((answer, index) => (
//                         <button key={index} className="btn" onClick={() => selectAnswer(answer.correct)}>
//                             {answer.text}
//                         </button>
//                     ))}
//                 </div>
//                 <button id="next-btn" onClick={handleNextButton}>
//                     {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
//                 </button>
//                 {currentQuestionIndex === questions.length && showScore()}
//             </div>
//         </div>
//     );
// }

// export default QuizApp;









import React, { useState, useEffect } from 'react';
import './style.css'; // Assuming you have a CSS file named 'style.css'
import {computerNetworkingQuestions, reactQuestions} from './questions';
import NavbarComponent from '../navbar/navbar';



function QuizApp() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < reactQuestions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowScore(true);
        }
    };

    const handleNextButtonClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < reactQuestions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowScore(true);
        }
    };

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <>
      
        <div id = "quizAppBody">
        <div className="appQuizContainer">
            <h1>Simple Quiz Question</h1>
            <div className="quiz">
                {showScore ? (
                    <div>
                        <h2>You scored {score} out of {reactQuestions.length}</h2>
                        <button onClick={startQuiz}>Play Again</button>
                    </div>
                ) : (
                    <div>
                        <h2 id="question">{reactQuestions[currentQuestionIndex].question}</h2>
                        <div id="answer-buttons">
                            {reactQuestions[currentQuestionIndex].answers.map((answer, index) => (
                                <button key={index} className="quizBtn" onClick={() => handleAnswerButtonClick(answer.correct)}>
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                        <button id="next-btn" onClick={handleNextButtonClick}>
                            {currentQuestionIndex < reactQuestions.length - 1 ? 'Next' : 'Finish'}
                        </button>
                    </div>
                )}
            </div>
        </div>
        </div>
        </>
    );
}

export default QuizApp;



