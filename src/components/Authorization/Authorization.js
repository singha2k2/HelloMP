import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import axios from "axios";
import { setUser } from "../../redux/userActions";

const carouselBackgroundStyles = {
  position: "absolute",
  top: "0",
  filter: "blur(2px)",
  height: "100px",
};

const crouselImage1 = "./images/loginCarousel/crousel_image1.jpg";
const crouselImage2 = "./images/loginCarousel/crousel_image2.jpg";
const crouselImage3 = "./images/loginCarousel/crousel_image3.jpg";

export function CarouselFadeExample() {
  return (
    <Carousel fade interval={1500} style={carouselBackgroundStyles}>
      <Carousel.Item>
        <img src={crouselImage1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={crouselImage2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={crouselImage3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export const AlertComponent = ({ className, message, messageCore }) => {
  return (
    <div className={`alert ${className} mt-3 lead`} role="alert">
      {message} : <strong>{messageCore}</strong> <br />
    </div>
  );
};

export let userData;

function LoginSignupCards({ title, bottomTitle }) {
  const [emailParam, setEmailParam] = useState("");
  const location = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Naviagtion
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const dispatch = useDispatch();
  const [backendResp, setbackendResp] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromURL = searchParams.get("email");
    if (emailFromURL) {
      setEmailParam(emailFromURL);
    }
  }, [location]);

  const cardStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "66%",
    opacity: "93%",
  };

  const imageStyles = { height: "400px", width: "450px", borderRadius: "5%" };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Forms

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    const url = `/register-user?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(emailParam)}`;
    navigate(url);
  };

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect after 3 seconds
    setTimeout(() => {
      clearInterval(countdownInterval);
      navigate(`/login-user?email=${encodeURIComponent(emailParam)}`, {
        replace: true,
      });
    }, 3000);
  };

  useEffect(() => {
    if (showAlert && isSuccess) {
      startCountdown();
    }
  }, [showAlert, isSuccess]);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set loading to true before making the axios request
      setLoading(true);
      const token = localStorage.getItem("token");
      let response;
      if (password.includes(".doubtsolver.")) {
        response = await axios.post(
          "https://learning-server-olive.vercel.app/api/loginDoubtSolver",
          {
            email: emailParam,
            password: password,
            token: token != null ? token : "no-token",
          }
        );
      } else if (password.includes(".admin.")) {
        console.log("in this");
        response = await axios.post(
          "https://learning-server-olive.vercel.app/api/loginAdmin",
          {
            email: emailParam,
            password: password,
            token: token != null ? token : "no-token",
          }
        );
      } else {
        response = await axios.post(
          "https://learning-server-olive.vercel.app/api/loginUser",
          {
            email: emailParam,
            password: password,
            token: token != null ? token : "no-token",
          }
        );
      }

      setLoading(false);

      if (response.data.success === true) {
        userData = response;
        setbackendResp(response.data.user.name);

        // console.log(response.data.token);
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        document.cookie = `token=${response.data.token}; path=/`;
        setIsSuccess(true);
        setShowAlert(true);

        if (password.includes(".doubtsolver.")) {
          localStorage.setItem("userType", "doubtsolver");
        } else if (password.includes(".admin.")) {
          localStorage.setItem("userType", "admin");
         
        } else {
          localStorage.setItem("userType", "user");
        }
        // console.log(response);
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
      {loading && <Loader />}
      <CarouselFadeExample />

      <div style={cardStyles}>
        <Card className="text-center d-flex flex-row m-auto">
          <Card.Body>
            {title === "Login" ? (
              <img src="./images/login.png" style={imageStyles} alt="login" />
            ) : (
              <img src="./images/signup.png" style={imageStyles} alt="login" />
            )}
          </Card.Body>
          <Card.Body>
            <div className="d-flex flex-column justify-content-between align-items-between ">
              <h1>
                {title}{" "}
                {title === "Login" ? (
                  <i className="bi bi-door-closed"></i>
                ) : (
                  <i className="bi bi-door-open"></i>
                )}
              </h1>
              <Form
                onSubmit={
                  title === "Login"
                    ? handleLoginFormSubmit
                    : handleSignupFormSubmit
                }
                action="/register-user"
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {title === "Login" ? (
                    <Form.Text className="text-muted ">
                      {" "}
                      Authorise yourself to access the content using your
                      credentials.
                    </Form.Text>
                  ) : (
                    <Form.Text className="text-muted">
                      Create an account to access the content. Encrypted and
                      secure.
                    </Form.Text>
                  )}
                  <br />
                  {title === "Login" ? (
                    <div></div>
                  ) : (
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Enter Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Name"
                        required
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Enter Your Name"
                      />
                      <Tooltip id="my-tooltip" />
                    </Form.Group>
                  )}

                  <br />
                  {title === "Login" ? (
                    <div>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        value={emailParam}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmailParam(e.target.value)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Valid Email"
                      />
                      <div>
                        <Form.Label>Password</Form.Label>

                        <div className="d-flex flex-row align-items-center">
                          <Form.Control
                            value={password}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Valid Password"
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
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        value={emailParam}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmailParam(e.target.value)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Valid Email"
                      />
                    </div>
                  )}

                  {title === "Login" ? (
                    <Form.Text className="text-muted ">
                      Don't Worry !! Your Password is Encrypted and Secure
                    </Form.Text>
                  ) : (
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  {title === "Login" ? "Login" : "Sign Up"}
                </Button>
                {showAlert && isSuccess && (
                  <AlertComponent
                    className="alert-success"
                    message={`Redirecting in ${countdown} seconds `}
                    messageCore={backendResp}
                  />
                )}
                {showAlert && !isSuccess && (
                  <>
                    <AlertComponent
                      className="alert-danger"
                      message="Authentication Failed :"
                      messageCore={backendResp}
                    />
                  </>
                )}
              </Form>
              <Card.Footer className="mt-4">
                {" "}
                <Link
                  to={bottomTitle === "Login" ? "/login" : "/signup"}
                  className="text-decoration-none"
                >
                  {" "}
                  {bottomTitle} <i className="bi bi-check-circle-fill"></i>
                </Link>
                <Link to={"/social-login"} className="text-decoration-none m-3">
                  {" "}
                  Social Login
                  <i className="bi bi-google mx-1"></i>
                </Link>
                <Link to="/" className="text-decoration-none">
                  {" "}
                  HomePage <i className="bi bi-house-check-fill"></i>
                </Link>
              </Card.Footer>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default LoginSignupCards;
