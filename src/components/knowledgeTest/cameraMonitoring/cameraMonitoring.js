import React, { useEffect, useRef,useState } from 'react';


export const stopRecordingAndSave = async (fileHandle, mediaRecorderRef, chunksRef, setStatus, setRecording, onCameraStop) => {

  if (!fileHandle) {
    console.error("File handle is undefined");
    return;
  }

  if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
    mediaRecorderRef.current.stop();
    setStatus('Stopping');

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      setStatus('Idle');
      setRecording(false);
      chunksRef.current = []; // Clear chunks for next recording

      if (onCameraStop) {
        onCameraStop();
      }
    };

    // Stop the camera after saving the recording
    const stream = fileHandle.getFile().stream;
    if (stream && stream.getTracks) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

};




const CameraMonitoring = ({ onCameraStop, mediaRecorderRef, chunksRef, setStatus, setRecording }) => {
  const videoRef = useRef(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        startRecording(stream);
      } catch (error) {
        alert('Error accessing camera or file system:', error);
      }
    };

    const startRecording = (stream) => {
      setStatus('Recording');
      setRecording(true);
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      // Start the timer
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    };

    if (!mediaRecorderRef.current) {
      initCamera();
    }

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        clearInterval(intervalId); // Clear the interval when component unmounts
      }
    };
  }, [mediaRecorderRef, setRecording, setStatus, chunksRef]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="camera-feed">
      <video ref={videoRef} muted autoPlay width="100%" height="auto" />
      <div className="timer">{formatTime(timer)}</div>
    </div>
  );
};

export default CameraMonitoring;
