import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/loader";

function KnowledgeOptions() {
  const [questionOptions, setQuestionOptions] = useState([
    "reactQuestions",
    "computerNetworkingQuestions",
    "osQuestions",
    "dsaQuestions",
    "oopsQuestions",
  ]);

  const returnDivElements = () => {
    return questionOptions.map((question, index) => (
      <div className="d-flex " key={index}>
        <div
          className="card"
          style={{
            border: "1px solid rgb(228, 228, 228)",
            boxShadow: "5px 5px 15px rgb(174, 173, 173)",
            width: "20rem",
            margin: "15px",
            height: "42vh",
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
            src={"/images/minions/questions.jpg"}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{question || "question Name"}</h5>
            <p className="card-text">
              <strong>Email:</strong> question Email
            </p>

            <p className="card-text">
              <strong>Age:</strong> {"question Age"}
            </p>

            <Link to={`/dashboard-user/knowledge-test/${question}`} className="btn btn-success">
              Test Now
            </Link>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <div className="d-flex flex-wrap">{returnDivElements()}</div>
    </>
  );
}

export default KnowledgeOptions;
