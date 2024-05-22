import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import './CallSolver.css';

const ROOM_ID = "5504"; // Replace with the actual room ID

const CallSolver = () => {
  const [peers, setPeers] = useState({});
  const CallSolverRef = useRef(null);
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    const socket = io('/');
    socketRef.current = socket;
    const peer = new Peer(undefined, {
      host: '/',
      port: '3001' // Replace with your PeerJS server port
    });
    peerRef.current = peer;

    const myVideo = document.createElement('video');
    myVideo.muted = true;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(myVideo, stream);

      peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
      });
    });

    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close();
    });

    peer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id);
    });

    return () => {
      socket.disconnect();
      peer.destroy();
    };
  }, []);

  const connectToNewUser = (userId, stream) => {
    const call = peerRef.current.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    setPeers(prevPeers => ({ ...prevPeers, [userId]: call }));
  };

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    CallSolverRef.current.append(video);
  };

  return (
    <div id="video-grid" ref={CallSolverRef} className="video-grid"></div>
  );
};

export default CallSolver;
