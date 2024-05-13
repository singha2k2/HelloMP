import React, { useState } from "react";
import Scanner from "./Scanner";
import { Button, Card, Form } from "react-bootstrap";
import { CarouselFadeExample } from "../../Authorization/Authorization";

import { Link } from "react-router-dom";

const BarcodeScanner = () => {
  const [results, setResults] = useState([]);

  const _onDetected = (result) => {
    setResults([]);
    setResults(results.concat([result]));
  };

  const cardStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "66%",
  };

  const imageStyles = { height: "500px", width: "450px", borderRadius: "5%" };

  const bottomTitle = "Login";
  return (
    <div>
      <CarouselFadeExample />
      <div style={cardStyles}>
        <Card className="text-center d-flex flex-row m-auto">
          <Card.Body>
            <img src="./images/biometric.png" style={imageStyles} alt="login" />
          </Card.Body>
          <Card.Body>
            <div className="d-flex flex-column justify-content-between align-items-between ">
              <h1>Biometic Authentication</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Text className="text-muted">
                    Please Scan your Bar Code to login
                  </Form.Text>
                  <br />
                  <Form.Label>Scanner</Form.Label>
                  <Form
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      width: 640,
                      height: 300,
                      border: "0.5px solid black",
                    }}
                  >
                    <Scanner onDetected={_onDetected} />
                  </Form>
                </Form.Group>
                <Form.Text className="text-muted">
                  {results[0] ? results[0].codeResult.code : "No data scanned"}
                  {results[0] ? (
                    <Button className="m-3" variant="primary" type="submit">
                      Submit
                    </Button>
                  ) : null}
                </Form.Text>
              </Form>
              <Card.Footer className="mt-4">
                {" "}
                <Link
                  to={bottomTitle === "Login" ? "/login" : "/signup"}
                  className="text-decoration-none"
                >
                  {" "}
                  {bottomTitle} <i class="bi bi-check-circle-fill"></i>
                </Link>
                <Link
                  to={bottomTitle === "Login" ? "/login" : "/bar-code-auth"}
                  className="text-decoration-none m-3"
                >
                  {" "}
                  {bottomTitle === "Login"
                    ? "Register Biometric"
                    : "Biometric Login"}{" "}
                  <i class="bi bi-fingerprint"></i>
                </Link>
                <Link to="/" className="text-decoration-none">
                  {" "}
                  HomePage <i class="bi bi-house-check-fill"></i>
                </Link>
              </Card.Footer>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BarcodeScanner;
