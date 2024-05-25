import React, { useState, useEffect, useRef } from 'react';
import CameraMonitoring from '../cameraMonitoring/cameraMonitoring';
import Options from '../options/options';
import Question from '../question/question';
import './knowledgeTest.css';
import QuizApp from '../../QuizApp/QuizApp';
import { useParams } from 'react-router-dom';

function KnowledgeTest() {
  const { questionTopic } = useParams();
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [fileHandle, setFileHandle] = useState(null);
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState('Idle');

  const handleCameraStop = () => {
    console.log("Camera stopped.");
  };


  useEffect(() => {
    console.log("Question Topic from URL:", questionTopic);
    
  }, [questionTopic]);

  return (
    <div className="testing-screen">
      <div className="left">
        <div className="question">
        <QuizApp
       onFinish={handleCameraStop}
       fileHandle={fileHandle}
       setFileHandle={setFileHandle}
       mediaRecorderRef={mediaRecorderRef}
       chunksRef={chunksRef}
       setStatus={setStatus}
       setRecording={setRecording}
       onCameraStop={handleCameraStop}
      />
        </div>
      </div>
      <div className="right" style={{ borderRadius: "20px" }}>
        <div className="camera-feed" style={{ borderRadius: "20px" }}>
        <CameraMonitoring
        onCameraStop={handleCameraStop}
        setFileHandle={setFileHandle}
        mediaRecorderRef={mediaRecorderRef}
        chunksRef={chunksRef}
        setStatus={setStatus}
        setRecording={setRecording}
      />
          <table className="mt-5 mx-5">
            <tbody>
              <tr>
                <td style={{ color: "white" }}>Topic Of Test:</td>
                <td style={{ color: "white" }}>{questionTopic}</td>
              </tr>
              <tr>
                <td style={{ color: "white" }}>Time Left:</td>
                <td style={{ color: "white" }}>{new Date().getMinutes()} Minutes</td>
              </tr>
              <tr>
                <td style={{ color: "white" }}>Number of Questions:</td>
                <td style={{ color: "white" }}>15</td>
              </tr>
            </tbody>
          </table>
          <table className="mt-5 mx-5">
            <tbody>
              <tr>
                <td>
                  <h1 className="text-danger">Recording In Progress <i className="bi bi-vinyl-fill"></i></h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="options">
          {/* Add options component or data */}
        </div>
      </div>
    </div>
  );
}

export default KnowledgeTest;
