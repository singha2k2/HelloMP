import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Import useSelector hook

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

function Dashboard() {
  const user = useSelector((state) => state.user); 

  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [userData,setUserData] = useState(null);
  const [email,setEmail] = useState("");
  const [enrolledCourses,seetEnrolledCourses] = useState([]);
  const [dayTime, setDayTime] = useState("");
  const [noEnrolledCourses,SetNoEnrolledCourses] = useState(0);

  const availableCourses = [
    {
      _id: 1,
      imageLink: "./images/dashboard/java_course_1.jpg",
      heading: "Learn Java Basics",
      description: "Premium content to Learn Java Basics",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 2,
      imageLink: "./images/dashboard/java_course_2.jpg",
      heading: "Learn Inheritance",
      description:
        "Premium content to Java Access Modifiers (Inheritance Basics)",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 3,
      imageLink: "./images/dashboard/java_course_3.jpg",
      heading: "Learn Polymorphism",
      description: "Premium content to learn Polymorphism",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    
    },
    {
      _id: 4,
      imageLink: "./images/dashboard/java_course_3.jpg",
      heading: "Learn Encapsulation",
      description: "Premium content to learn Encapsulation",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
    {
      _id: 5,
      imageLink: "./images/dashboard/java_course_3.jpg",
      heading: "Learn Abstraction",
      description: "Premium content to learn Abstraction",
      linktoredirect: "/learn-oops-in-java",
      isCompleted: false,
      isEnrolled: false,
    },
  ];
 
  const handleEnrollmentStatus = async (heading) => {
    console.log(heading, email);
    setLoading(true);
    try {
        const response = await axios.put("https://learning-server-olive.vercel.app/api/updateCoursesEnrolled", {
            email: email,
            courseHeading: heading
        });
        console.log(response.data); 
        if (response.data.success) {
        seetEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, heading]);
          SetNoEnrolledCourses(enrolledCourses.length)
      }
      SetNoEnrolledCourses(enrolledCourses.length)
        setLoading(false);
    } catch (error) {
        console.log(error.response.data); // Log the error response data
        setLoading(false);
    }
}

const setTime = () => {
const currentHour = new Date().getHours();
if (currentHour >= 5 && currentHour < 12) {
  setDayTime("Good Morning ");
 
} else if (currentHour >= 12 && currentHour < 17) {
  setDayTime("Good Afternoon ");

} else {
  setDayTime("Good Evening ");
 
}
}


  const loadUserInfoOnLoad = async (userEmail) => {
    setLoading(true);
    try {
      const response = await axios.get("https://learning-server-olive.vercel.app/api/findUserInfo", {
        params: {
          email: userEmail // Provide email as a request parameter
        }
      });
      const userData = response.data; 
      
      setUserData(userData);

      seetEnrolledCourses(userData.user.coursesEnrolled);
      SetNoEnrolledCourses(userData.user.coursesEnrolled.length)
      setLoading(false);
    } catch (error) {
      console.error(error);
      const defaultUserData = {
        user: {
          name: "Username"
        }
      };
      setUserData(defaultUserData);
      setLoading(false);
    }
  };
  
  useEffect( () => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    const userEmail = localStorage.getItem("email");
    setTime();
    setEmail(userEmail);
    loadUserInfoOnLoad(userEmail);

  }, [noEnrolledCourses]);
  
  

  return (
    <>
    {loading && <Loader />}
      <div className="mainbar">
        <NavbarComponent isLogged={true} />
      </div>

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
                <img src="./images/profile.png" />
              </div>
              <span>{dayTime }{!userData ? "Username " : userData.user.name.substring(0,5)}</span>
            </div>
            <div className="mx-5 header-user-container">
              <span>{"Courses Enrolled : " }{!userData ? "0" : noEnrolledCourses}</span>
            </div>
          </div>
          <div className="sidebar-links">
            <Link to={"profile"}  className="btn btn-primary mx-2 my-2">
            <button >
              My Profile
              </button>
              </Link>
            <Link to={""}  className="btn btn-primary mx-2 my-2">
            <button >
            Course Hero
              </button>
              </Link>
            <Link to={"web-compiler"}  className="btn btn-primary mx-2 my-2">
            <button >
            Web Compiler
              </button>
              </Link>
            <Link to={"flex-box-game"}  className="btn btn-primary mx-2 my-2">
            <button >
            Learn FlexBox
              </button>
              </Link>
            <Link to={"top-teacher"}  className="btn btn-primary mx-2 my-2">
            <button >
            Learn from Top Trainers
              </button>
              </Link>
            <Link to={"chat-with-ai"}  className="btn btn-primary mx-2 my-2">
            <button >
            Chat With AI
              </button>
              </Link>
            <Link to={"knowledge-test"}  className="btn btn-primary mx-2 my-2">
            <button >
            Knowledge Test
              </button>
              </Link>
            <Link to={"tic-tac-toe"}  className="btn btn-primary mx-2 my-2">
            <button >
            Mind Refresher
              </button>
              </Link>
            <Link to={"java-coder"}  className="btn btn-primary mx-2 my-2">
            <button >
            Java Pad
              </button>
              </Link>
            <Link to={"todo-list"}  className="btn btn-primary mx-2 my-2">
            <button >
            Work Tracker
              </button>
              </Link>
            <Link to={"doubt-asker"}  className="btn btn-primary mx-2 my-2">
            <button >
           Ask Doubts
              </button>
              </Link>
           
          </div>
         
        </div>

        <div className="dashboardmainbar">
        
          <Routes>

         <Route path="/" element=
          {availableCourses.map((course,index)=>(
            <AvailableCourses enrolledCourses={enrolledCourses} key={index} course={course} handleEnrollmentStatus={handleEnrollmentStatus} />
            
          ))}
          />
        <Route path="/profile" element={<UserProfile userData={userData} />} />
       
        <Route path="/top-teacher" element={<Course />} />
        <Route path="/web-compiler" element={<WebCodeCompiler />} />
        <Route path="/flex-box-game" element={<FlexboxGame />} />
        <Route path="/chat-with-ai" element={<Chatbot />} />
        <Route path="/knowledge-test" element={<KnowledgeTest />} />
        <Route path="/tic-tac-toe" element={<TicTacToe videoUrl="./video/ttt.mp4" />} />
        <Route path="/java-coder" element={<JavaCodeCompiler />} />
        <Route path='/todo-list' element={<ToDoListApp />} />
        <Route path='/doubt-asker' element={<AskDoubts />} />
        
           
           </Routes>
       
          
        </div>
      </div>
     
      <Footer />
    </>
  );
}

export default Dashboard;
