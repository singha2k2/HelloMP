import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { stopRecordingAndSave } from "../knowledgeTest/cameraMonitoring/cameraMonitoring";
import "./style.css";
import {
  reactQuestions,
  computerNetworkingQuestions,
  osQuestions,
  dsaQuestions,
  oopsQuestions,
} from "./questions";

const topicsMap = {
  reactQuestions: reactQuestions,
  computerNetworkingQuestions: computerNetworkingQuestions,
  osQuestions: osQuestions,
  dsaQuestions: dsaQuestions,
  oopsQuestions: oopsQuestions,
};

function QuizApp({ 
  onFinish, 
  fileHandle, 
  setFileHandle, 
  mediaRecorderRef, 
  chunksRef, 
  setStatus, 
  setRecording, 
  onCameraStop 
}) {
  const { questionTopic } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [choosenTopic, setChoosenTopic] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedQuestions = topicsMap[questionTopic] || [];
    setChoosenTopic(selectedQuestions);
  }, [questionTopic]);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < choosenTopic.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
      if (onFinish) {
        onFinish(); // Call onFinish prop if provided
      }
    }
  };

  const handleSubmitButton = async () => {
    const handle = await window.showSaveFilePicker({
      suggestedName: `recording-${Date.now()}.webm`,
      types: [
        {
          description: 'Video Files',
          accept: {
            'video/webm': ['.webm'],
          },
        },
      ],
    });
    setFileHandle(handle);
    stopRecordingAndSave(handle, mediaRecorderRef, chunksRef, setStatus, setRecording, onCameraStop);
navigate("/dashboard-user/knowledge-test");
window.location.reload();
  };

  return (
    <>
      <div id="quizAppBody">
        <div className="appQuizContainer">
          <h1>{questionTopic} {currentQuestionIndex + 1}/{choosenTopic.length}</h1>
          <div className="quiz">
            {showScore ? (
              <div>
                <h2>
                  You scored {score} out of {choosenTopic.length}
                </h2>
                <Link className="btn btn-primary" onClick={handleSubmitButton}>Submit</Link>
              </div>
            ) : (
              choosenTopic.length > 0 && (
                <div>
                  <h2 id="question">
                    {choosenTopic[currentQuestionIndex].question}
                  </h2>
                  <div id="answer-buttons">
                    {choosenTopic[currentQuestionIndex].answers.map(
                      (answer, index) => (
                        <button
                          key={index}
                          className="quizBtn"
                          onClick={() => handleAnswerButtonClick(answer.correct)}
                        >
                          {answer.text}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizApp;
