import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loader from "../loader/loader";
import axios from "axios";

const ChatDoubtSolver = () => {
  const [isConversational, setIsConversational] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doubtSolvers, setDoubtSolvers] = useState([]);
  const navigate = useNavigate();

  const loadAllDoubtSolvers = async () => {
    try {
      const response = await axios.get(
        "https://learning-server-olive.vercel.app/api/getAllDoubtSolver"
      );
      setDoubtSolvers(response.data.users);
      console.log(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doubt solvers:", error);
      setLoading(false);
    }
  };



  useEffect(() => {
    
    loadAllDoubtSolvers();
  }, []);

  const handleEnrollmentStatus = async (solverEmail) => {
    setLoading(true);
    console.log(`Enrolling with ${solverEmail}`);
    try {
      const response = await axios.post(
        "https://learning-server-olive.vercel.app/api/conversations",
        {
          user: localStorage.getItem("email"),
          doubtSolver: solverEmail,
        }
      );
      if (!response) {
        console.log("Internet Connection Error");
        return;
      }
      const conversationId = response.data.conversationData._id;
      navigate(`/dashboard-user/chat-solver-chat/${conversationId}/${solverEmail}`);
    } catch (error) {
      console.log("Internet Connection Error", error);
      return;
    }

    setIsConversational(true);
  };

  const maskString = (str) =>{
    let visiblePart = str.substring(0, 5);
  
    // Mask the rest with asterisks
    let maskedPart = "******";
    
    // Return the concatenated result
    return `${visiblePart}${maskedPart}`;
  }

  const returnDivElements = () => {
    return doubtSolvers.map((solver, index) => (
      <div className="d-flex" key={solver._id}>
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
            <h5 className="card-title">{solver.name || "Solver Name"}</h5>
            <p className="card-text">
              <strong>Email:</strong> {maskString(solver.email) || "Solver Email"}
            </p>
            <p className="card-text">
              <strong>Phone Number:</strong>{" "}
              {maskString(solver.phoneNumber.toString()) || "Solver Phone Number"}
            </p>
            <p className="card-text">
              <strong>Age:</strong> {solver.age || "Solver Age"}
            </p>
            <p className="card-text">
              <strong>Doubts Solved:</strong>{" "}
              {solver.numberOfDoubtsSolved || 0}
            </p>

            {isConversational ? (
              <Button className="btn btn-success" disabled={true}>
                Chat Now
              </Button>
            ) : (
              <Button
                onClick={() => handleEnrollmentStatus(solver.email)}
                className="btn btn-primary"
              >
                Chat Now
              </Button>
            )}
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
  );
};

export default ChatDoubtSolver;
