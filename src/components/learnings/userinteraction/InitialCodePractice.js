import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function InitialCodePractice({
  question,
  onAnswerSubmit,
  hintModalStatus,
  tryAgainFlag,
  isListComplete,
}) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onAnswerSubmit(answer);
    setAnswer("");
  };

  return (
    <>
      <div className="coding-practice-main">
        <div className="playground-main">
          {isListComplete ? (
            <Modal.Dialog className="mx-4">
              <Modal.Header >
                <Modal.Title>Module Complete</Modal.Title>
              </Modal.Header>

              <Modal.Body className="my-3">
                <img src="./images/games/game_cong.gif" />
                
              </Modal.Body>

              <Modal.Footer>
                <Link to={"/"} className="btn btn-success" >Proceed</Link>
               
              </Modal.Footer>
            </Modal.Dialog>
          ) : (
            <Modal.Dialog className="mx-4">
              <Modal.Header closeButton>
                <Modal.Title>{question.question}</Modal.Title>
              </Modal.Header>

              <Modal.Body className="my-3">
                <input
                  style={{
                    borderRadius: "10px",
                    width: "38vw",
                    color: "black",
                  }}
                  type="text"
                  className="my-2 px-2"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {tryAgainFlag && (
                  <i>
                    Incorrect Answer Try Again !!
                    <br />
                  </i>
                )}
                {hintModalStatus && <i>Hint : {question.answer}</i>}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          )}
        </div>
      </div>
    </>
  );
}

export default InitialCodePractice;
