import React, { useRef, useEffect } from 'react';
function CameraMonitoring() {

    const videoRef = useRef(null);

    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => alert('Error accessing camera:', error));
    }, []);

    return (
        <div className="camera-feed" style={{borderRadius:"20px"}}>
          <video style={{borderRadius:"20px"}} ref={videoRef} autoPlay playsInline />
        </div>
      );
}

export default CameraMonitoring