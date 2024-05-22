import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector hook

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import "./Dashboard.css";
import Footer from "../footer/footer";
import { useTheme } from "../../context/ThemeContext";
import AvailableCourses from "./Courses/AvailableCourses";
import axios from "axios";
import Loader from "../loader/loader";
import UserProfile from "./profile/UserProfile";
import Course from "./Course";
import WebCodeCompiler from "../codeCompilers/webCodeCompiler/webCodeCompiler";
import FlexboxGame from "../game/FlexboxGame";
import Chatbot from "./Chatbot";
import KnowledgeTest from "../knowledgeTest/pageLayout/knowledgeTest";
import TicTacToe from "../TicTac/TicTacToe/TicTacToe";
import JavaCodeCompiler from "../codeCompilers/javaCodeCompiler/javaCodeCompiler";
import ToDoListApp from "../ToDoList/Todo";
import AskDoubts from "./AskDoubts";
import AllPayments from "../premiumContent/AllPayments";
import { Alert } from "react-bootstrap";
import CallSolver from "./callSolver/CallSolver";
import OneOnOne from "./oneOnOne/OneOnOne";
import NotFoundInDashboard from "./notFound/NotFoundInDashboard";
import OneToOneCall from "./oneOnOne/OneToOneCall";
import ChatDoubtSolver from "./ChatDoubtSolver";
import ChatSolverChatter from "./ChatSolverChatter";

function Dashboard() {
  const user = useSelector((state) => state.user);

  const { darkMode, toggleDarkMode } = useTheme();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [enrolledCourses, seetEnrolledCourses] = useState([]);
  const [dayTime, setDayTime] = useState("");
  const [noEnrolledCourses, SetNoEnrolledCourses] = useState(0);
  const [successCredits, setSuccessCredits] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(
    "./images/SuccessCredits.png"
  );
  const [existingCoins, setExistingCoins] = useState(
     0
  );
  const availableCourses = [
    {
      _id: 1,
      imageLink: "/images/dashboard/java_course_1.jpg",
      heading: "Learn Java Basics",
      description: "Premium content to Learn Java Basics",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 2,
      imageLink: "/images/dashboard/java_course_2.jpg",
      heading: "Learn Inheritance",
      description:
        "Premium content to Java Access Modifiers (Inheritance Basics)",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 3,
      imageLink: "/images/dashboard/java_course_3.jpg",
      heading: "Learn Polymorphism",
      description: "Premium content to learn Polymorphism",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 4,
      imageLink: "/images/dashboard/java_course_3.jpg",
      heading: "Learn Encapsulation",
      description: "Premium content to learn Encapsulation",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 5,
      imageLink: "/images/dashboard/java_course_3.jpg",
      heading: "Learn Abstraction",
      description: "Premium content to learn Abstraction",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
  ];
  const handleEnrollmentStatus = async (heading) => {
    const prevCount = parseInt(localStorage.getItem("successCredits"));
    console.log(heading, email);
    setLoading(true);
  console.log(existingCoins);
    if (existingCoins < 10) {
      setShow(true);
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.put(
        "https://learning-server-olive.vercel.app/api/updateCoursesEnrolled",
        {
          email: email,
          courseHeading: heading,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        seetEnrolledCourses((prevEnrolledCourses) => [
          ...prevEnrolledCourses,
          heading,
        ]);
        SetNoEnrolledCourses((prevCount) => prevCount + 1);
  
        try {
          const creditsResponse = await axios.put(
            `https://learning-server-olive.vercel.app/api/updateSuccessCredits`,
            {
              email: email,
              successCredits: existingCoins - 10,
            }
          );
  
          console.log(creditsResponse);
  
          if (!creditsResponse.data.success) {
            console.log("Error in Updating Details");
            setLoading(false);
            return;
          }
          localStorage.setItem("successCredits", existingCoins - 10);
          setExistingCoins(existingCoins - 10);
        } catch (error) {
          console.log(error); // Log the error response data
          setLoading(false);
        }
        return;
      }
      localStorage.setItem("successCredits", 0);
      setExistingCoins(0);
  
      setLoading(false);
    } catch (error) {
      console.log(error.response.data); // Log the error response data
      setLoading(false);
    }
  };

  const setTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setDayTime("Good Morning ");
    } else if (currentHour >= 12 && currentHour < 17) {
      setDayTime("Good Afternoon ");
    } else {
      setDayTime("Good Evening ");
    }
  };

  const loadUserInfoOnLoad = async (userEmail) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://learning-server-olive.vercel.app/api/findUserInfo",
        {
          params: {
            email: userEmail, // Provide email as a request parameter
          },
        }
      );
      const userData = response.data;

      setUserData(userData);
      localStorage.setItem("phoneNumber", userData.user.phoneNumber);
      const credits = localStorage.setItem(
        "successCredits",
        userData.user.successCredits
      );
      setSuccessCredits(userData.user.successCredits);
      seetEnrolledCourses(userData.user.coursesEnrolled);
      SetNoEnrolledCourses(userData.user.coursesEnrolled.length);
      setLoading(false);
    } catch (error) {
      console.error(error);
      const defaultUserData = {
        user: {
          name: "Username",
        },
      };
      setUserData(defaultUserData);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const userEmail = localStorage.getItem("email");
    setTime();
    setEmail(userEmail);
    loadUserInfoOnLoad(userEmail);
    setExistingCoins(parseInt(localStorage.getItem("successCredits")) );
  }, [noEnrolledCourses, enrolledCourses.length,existingCoins]);

  const closeImage = () => {
    setIsImageOpen(false);
  };

  const handleSuccessCreditUpdation = () =>{
setExistingCoins((exiting) => exiting -5);
  }

  return (
    <>
      {isImageOpen && (
        <div
          className="fullscreen-image"
          style={{ backgroundImage: `url(${currentImage})` }}
          onClick={closeImage}
        ></div>
      )}
      {loading && <Loader />}
      <div className="mainbar">
        <NavbarComponent isLogged={true} successCredits={successCredits} />
      </div>
      {show && 
      <Alert key={"primary"} variant={"primary"} onClose={() => setShow(false)} dismissible>
      You don't have enough coins.
      <Alert.Link href="/get-more-in-less">Purchase Here</Alert.Link> more Coins
      you like.
    </Alert>
    }

      <div className="homepage">
        <div
          className="dashboardsidebar"
          style={{
            background: darkMode
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="profile-container">
            <div className="image-container">
              <div className="user-img">
                {" "}
                <img src="/images/profile.png" />
              </div>
              <span>
                {dayTime}
                {!userData ? "Username " : userData.user.name.substring(0, 5)}
              </span>
            </div>
            <div className="mx-5 header-user-container">
              <span>
                {"Courses Enrolled : "}
                {!userData ? "0" : noEnrolledCourses}
              </span>
              <br />
              <span>
                {"Success Credits : "}
                {!userData ? "0" : successCredits}
              </span>
            </div>
          </div>
          <div className="sidebar-links">
            <Link to={"profile"} style={{fontSize: "large", fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>My Profile</button>
            </Link>
            <Link to={""} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Course Hero</button>
            </Link>
            <Link to={"web-compiler"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Web Compiler</button>
            </Link>
            <Link to={"flex-box-game"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Learn FlexBox</button>
            </Link>
            <Link to={"top-teacher"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Learn from Top Trainers</button>
            </Link>
            <Link to={"chat-solver"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Chat Doubt Solvers[New<i class="bi bi-stars"></i>]</button>
            </Link>
            <Link to={"one-on-one"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>One on One[New<i class="bi bi-stars"></i>]</button>
            </Link>
            <Link to={"chat-with-ai"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Chat With AI</button>
            </Link>
            <Link to={"knowledge-test"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Knowledge Test</button>
            </Link>
            <Link to={"tic-tac-toe"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Mind Refresher</button>
            </Link>
            <Link to={"java-coder"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Java Pad</button>
            </Link>
            <Link to={"todo-list"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Work Tracker</button>
            </Link>
            <Link to={"doubt-asker"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Ask Doubts[New<i class="bi bi-stars"></i>]</button>
            </Link>
            <Link to={"all-transactions"} style={{fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",
    borderRadius: "10px"}} className="btn btn-dark mx-2 p-2 my-2">
              <button>Check All Transactions[New<i class="bi bi-stars"></i>]</button>
            </Link>
          </div>
        </div>

        <div className="dashboardmainbar">
          <Routes>
            <Route
              path="/"
              element={availableCourses.map((course, index) => (
                <AvailableCourses
                  enrolledCourses={enrolledCourses}
                  key={index}
                  course={course}
                  handleEnrollmentStatus={handleEnrollmentStatus}
                />
              ))}
            />
            <Route
              path="/profile"
              element={<UserProfile userData={userData} />}
            />

            <Route path="/top-teacher" element={<Course />} />
            <Route path="/web-compiler" element={<WebCodeCompiler />} />
            <Route path="/flex-box-game" element={<FlexboxGame />} />
            <Route path="/chat-with-ai" element={<Chatbot />} />
            <Route path="/knowledge-test" element={<KnowledgeTest />} />
            <Route path="/one-on-one" element={<OneOnOne userData={userData} linkString={"/dashboard-user/"} />} />
            <Route path="/one-to-one-call/:roomNumber" element={<OneToOneCall userData={userData} />} />
            <Route path="/chat-solver" element={<ChatDoubtSolver />} />
            <Route path="/chat-solver-chat/:conversationId/:solverEmail" element={<ChatSolverChatter userData={userData} />} />
            <Route
              path="/tic-tac-toe"
              element={<TicTacToe videoUrl="./video/ttt.mp4" />}
            />
            <Route path="/java-coder" element={<JavaCodeCompiler />} />
            <Route path="/todo-list" element={<ToDoListApp />} />
            <Route path="/doubt-asker" element={<AskDoubts handleSuccessCreditUpdation={handleSuccessCreditUpdation} />} />
            <Route path="/all-transactions" element={<AllPayments />} />
            <Route path="*" element={<NotFoundInDashboard />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
