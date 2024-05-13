import React, { useState, useEffect } from 'react';
import CameraMonitoring from '../cameraMonitoring/cameraMonitoring';
import Options from '../options/options';
import Question from '../question/question';
import './knowledgeTest.css';
import QuizApp from '../../QuizApp/QuizApp';

function KnowledgeTest() {
  // State to store the random topic
  const [randomTopic, setRandomTopic] = useState("");

  // Function to generate a random topic
  const generateRandomTopic = () => {
    const topics = ["Mathematics", "Science", "History", "Literature", "Geography"];
    const randomIndex = Math.floor(Math.random() * topics.length);
    return topics[randomIndex];
  }

  useEffect(() => {
    // Generate a random topic when the component mounts
    setRandomTopic(generateRandomTopic());
  }, []);

  return (
    <div className="testing-screen">
      <div className="left">
        <div className="question">
          <QuizApp />
        </div>
      </div>
      <div className="right" style={{borderRadius:"20px"}}>
        <div className="camera-feed" style={{borderRadius:"20px"}}>
          <CameraMonitoring />
          <table className='mt-5 mx-5'>
            <tbody>
              <tr>
                <td>Topic Of Test:</td>
                <td>{randomTopic}</td>
              </tr>
              <tr>
                <td>Time Left:</td>
                <td>{new Date().getMinutes()} Minutes</td>
              </tr>
              <tr>
                <td>Number of Questions:</td>
                <td>15</td>
              </tr>
            </tbody>
          </table>
          <table className='mt-5 mx-5'>
            <tbody>
              <h1 className='text-danger'>Recording In Progress <i class="bi bi-vinyl-fill"></i></h1>
              
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
