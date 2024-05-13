import React, { useEffect, useState } from "react";
import { AlertComponent, CarouselFadeExample } from "../Authorization";
import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Login() {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [genotp, setGenOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [emailStatus, setEmailStatus] = useState("");
  const [backendResp, setBackendResp] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromURL = searchParams.get("email");
    const generatedOTP = generateOTP();
    setGenOtp(generatedOTP);
    sendEmail(emailFromURL, generatedOTP);
  }, [location]);

  const generateOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    return generatedOTP;
  };

  const sendEmail = async (email, otp) => {
    try {
      const response = await axios.post(
        "https://learning-server-olive.vercel.app/core/sendEmail",
        {
          email: email,
          otp: otp,
        }
      );

      setEmailStatus(response.data.message);
    } catch (error) {
      setEmailStatus(error.message);
    }
  };

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect after 3 seconds
    setTimeout(() => {
      clearInterval(countdownInterval);
      const userType = localStorage.getItem("userType");
      if (userType==="doubtsolver") {
        navigate(`/dashboard-doubt-solver`, { replace: true });
      }else if(userType==="admin"){
        navigate(`/dashboard-admin`, { replace: true });
      }else{
        navigate(`/dashboard-user`, { replace: true });
      }
      
    }, 3000);
  };

  useEffect(() => {
    if (showAlert && isSuccess) {
      startCountdown();
    }
  }, [showAlert, isSuccess]);

  const verifyOtp = (e) => {
    e.preventDefault();
    if (genotp == otp) {
      // Set success state and show success alert
      setIsSuccess(true);
      setShowAlert(true);
      setBackendResp("Success");
      // You may perform additional actions for successful verification
    } else {
      // Set failure state and show error alert
      setIsSuccess(false);
      setShowAlert(true);
      setBackendResp("Failed");
      // You may perform additional actions for failed verification
    }
  };

  const cardStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "66%",
    opacity: "93%",
  };

  return (
    <>
      <div>
        <CarouselFadeExample />
        <div style={cardStyles}>
          <Card className="text-center d-flex flex-row m-auto">
            <Card.Body>
              <div className="d-flex flex-column justify-content-between align-items-between">
                <h1 className="m-2">
                  Lets Verify <i className="bi bi-door-closed"></i>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <p> Enter OTP Shared on Your Email </p>
                    <p> Email Status : {emailStatus} </p>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      inputStyle={{ border: "border 1px solid" }}
                      containerStyle={{ border: "border 1px solid" }}
                      numInputs={6}
                      style={{ border: "border 1px solid" }}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                    <Button onClick={verifyOtp}>Verify OTP</Button>
                    {showAlert && isSuccess && (
                      <AlertComponent
                        className="alert-success"
                        message={`Redirecting in ${countdown} seconds `}
                        messageCore={backendResp}
                      />
                    )}
                    {showAlert && !isSuccess && (
                      <AlertComponent
                        className="alert-danger"
                        message="Authentication "
                        messageCore={backendResp}
                      />
                    )}
                  </Card.Body>
                  <Card.Footer className="mt-4">
                    <Link to={"/signup"} className="text-decoration-none mx-4">
                      <i className="bi bi-arrow-left mx-2"></i>
                      {"Go Back"}
                    </Link>
                    <Link to="/" className="text-decoration-none">
                      {"HomePage"} <i className="bi bi-house-check-fill"></i>
                    </Link>
                  </Card.Footer>
                </h1>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;
