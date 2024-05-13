import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function ModalComponent({
  onCloseModal,
  modalTitle,
  modalBody,

}) {
  const handleProceed = () => {
    window.history.replaceState(null, "", "/learn-to-code");
   
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header onClick={onCloseModal} closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{modalBody}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onCloseModal} variant="secondary">
            Close
          </Button>
          {modalTitle === "Congratulations" ? (
            <Link to={"/learn-to-code"} onClick={handleProceed}>
              <Button variant="primary">Proceed</Button>
            </Link>
          ) : null}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalComponent;
