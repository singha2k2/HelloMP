import React, { useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Tooltip } from "react-tooltip";
import { CarouselFadeExample, AlertComponent } from "./../Authorization";

import axios from "axios";
import Loader from "../../loader/loader";

const cardStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
  width: "66%",
  opacity: "93%",
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [backendResp, setbackendResp] = useState("");

  // All Credentaials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onChange = (event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromURL = searchParams.get("email");
    const nameFromURL = searchParams.get("name");

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: emailFromURL || prevCredentials.email,
      name: nameFromURL || prevCredentials.name,
    }));
  }, [location]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true before making the axios request
      setLoading(true);

      const response = await axios.post(
        "https://learning-server-olive.vercel.app/api/registerUser",
        credentials
      );

      setLoading(false);
      // console.log(response);

      if (response.data.success === true) {
        setbackendResp(response.data._id);
        setIsSuccess(true);
        setShowAlert(true);
      } else {
        setbackendResp(response.data.error);
        setIsSuccess(false);
        setShowAlert(true);
      }
    } catch (error) {
      setLoading(false);
      setbackendResp(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  return (
    <div>
      <CarouselFadeExample />
      {loading && <Loader />}

      <div style={cardStyles}>
        <Card className="text-center d-flex flex-row m-auto">
          <Card.Body>
            <div className="d-flex flex-column justify-content-between align-items-between ">
              <h1>
                Create Account
                <i className="bi bi-door-closed"></i>
                <Form onSubmit={handleSignupFormSubmit} action="/register-user">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Name"
                        required
                        value={credentials.name}
                        name="name"
                        onChange={onChange}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Enter Your Name"
                      />
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        value={credentials.email}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={onChange}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Valid Email"
                      />
                      <Form.Label>Your Age</Form.Label>
                      <Form.Control
                        value={credentials.age}
                        type="number"
                        name="age"
                        placeholder="Enter age"
                        required
                        max={100}
                        onChange={onChange}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Valid Age"
                      />
                    </Form.Group>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="d-flex flex-row align-items-center">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={credentials.password}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
                        name="password"
                        onChange={onChange}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Password must contain 8-16 characters, one uppercase, one lowercase, one number and one special case character"
                      />

                      <input
                        className="mx-2"
                        type="checkbox"
                        onChange={togglePasswordVisibility}
                      />

                      <i
                        onClick={togglePasswordVisibility}
                        style={{ fontSize: "20px" }}
                        className={
                          showPassword ? "bi bi-eye-fill " : "bi bi-eye "
                        }
                      ></i>
                    </div>
                    <Tooltip style={{ fontSize: "13px" }} id="my-tooltip" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>{" "}
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={credentials.phoneNumber}
                      pattern="[0-9]{10}"
                      name="phoneNumber"
                      onChange={onChange}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Length of Phone Number must be 10"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                  {showAlert && isSuccess && (
                    <AlertComponent
                      className="alert-success"
                      message="Account Created with Encrpyted ID "
                      messageCore={backendResp}
                    />
                  )}
                  {showAlert && !isSuccess && (
                    <AlertComponent
                      className="alert-danger"
                      message="Account Creation Failed :"
                      messageCore={backendResp}
                    />
                  )}
                </Form>
                <Card.Footer className="mt-4" style={{ fontSize: "20px" }}>
                  {" "}
                  <Link to={"/signup"} className="text-decoration-none  mx-4">
                    <i className="bi bi-arrow-left mx-2"></i>
                    {"Go Back"}{" "}
                  </Link>
                  <Link to="/login" className="text-decoration-none">
                    {" "}
                    Login <i className="bi bi-house-check-fill"></i>
                  </Link>
                </Card.Footer>
              </h1>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Register;
