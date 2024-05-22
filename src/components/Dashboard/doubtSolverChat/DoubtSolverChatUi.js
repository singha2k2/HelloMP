import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/loader';

function DoubtSolverChatUi() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConversational, setIsConversational] = useState(false);

  const loadAllChats = async (doubtSolverEmail) => {
    try {
      const response = await axios.get(
        `https://learning-server-olive.vercel.app/api/conversations/${doubtSolverEmail}`
      );
      setConversations(response.data.conversations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setLoading(false);
    }
  }

  const handleEnrollmentStatus = async (solverEmail) => {
    setLoading(true);
    console.log(`Enrolling with ${solverEmail}`);
    try {
      const response = await axios.post(
        "https://learning-server-olive.vercel.app/api/conversations",
        {
          user: solverEmail,
          doubtSolver: localStorage.getItem("email"),
        }
      );
      if (!response) {
        console.log("Internet Connection Error");
        return;
      }
      const conversationId = response.data.conversationData._id;
      navigate(`/dashboard-doubt-solver/chat-student-chat/${conversationId}/${solverEmail}`);
    } catch (error) {
      console.log("Internet Connection Error", error);
      return;
    }
  }

  useEffect(() => {
    const email = localStorage.getItem("email");
    loadAllChats(email)
  }, []);


  const returnDivElements = () => {
    return conversations.map((conversation, index) => (
      <div className="d-flex" key={conversation._id}>
        <div
          className="card"
          style={{
            border: "1px solid rgb(228, 228, 228)",
            boxShadow: "5px 5px 15px rgb(174, 173, 173)",
            width: "20rem",
            margin: "15px",
            height: "auto",
            borderRadius: "20px",
            zIndex: 9999,
          }}
        >
          <img
            className="card-img-top"
            style={{
              width: "60%",
              display: "block",
              margin: "auto",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            src={"/images/minions/minions1.jpg"}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{conversation.user || "Solver Name"}</h5>
            <p className="card-text">
              <strong>Conversation ID:</strong> {conversation._id || "Conversation ID"}
            </p>
            <p className="card-text">
              <strong>User ID:</strong> {conversation.user || "User ID"}
            </p>
            <p className="card-text">
              <strong>Your ID:</strong> {conversation.doubtSolver || "Solver ID"}
            </p>
            <Button
              onClick={() => handleEnrollmentStatus(conversation.user)}
              className="btn btn-primary"
            >
              Chat Now
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex">{returnDivElements()}</div>
        </>
      )}
    </div>
  )
}

export default DoubtSolverChatUi;
