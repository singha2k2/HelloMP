import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Import useSelector hook

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import "./Dashboard.css";
import Footer from "../footer/footer";
import { useTheme } from "../../context/ThemeContext";
import AvailableCourses from "../Dashboard/Courses/AvailableCourses";
import axios from "axios";
import Loader from "../loader/loader";
import UserProfile from "../Dashboard/profile/UserProfile";
import AvailableDoubts from "./AvailableDoubts";
import SolveDoubt from "./SolveDoubt";
import RewardsCollection from "./RewardsCollection";

function DoubtSolverDashboard() {
  const user = useSelector((state) => state.user); 

  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [userData,setUserData] = useState(null);
  const [email,setEmail] = useState("");
  const [enrolledCourses,seetEnrolledCourses] = useState([]);
  const [dayTime, setDayTime] = useState("");
  const [noEnrolledCourses,SetNoEnrolledCourses] = useState(0);


  const [availableDoubts,setAvailableDoubts] = useState( [
  ]);
 
 

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
      const response = await axios.get("https://learning-server-olive.vercel.app/api/findDoubtSolverInfo", {
        params: {
          email: userEmail // Provide email as a request parameter
        }
      });
      const userData = response.data; 
      
      setUserData(userData);

    //   seetEnrolledCourses(userData.user.coursesEnrolled);
    
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

  const loadPresentDoubts = async() =>{
    try {
        const response = await axios.get("https://learning-server-olive.vercel.app/api/getAllUnsolvedDoubts");
        
        const userData = response.data; 
        
        setAvailableDoubts(userData.unsolvedDoubts);
        SetNoEnrolledCourses(userData.unsolvedDoubts.length)
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
  }
  
  useEffect( () => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    const userEmail = localStorage.getItem("email");
    setTime();
    setEmail(userEmail);
    loadUserInfoOnLoad(userEmail);
    loadPresentDoubts();

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
              <span>{"Available Doubts : " }{!userData ? "0" : noEnrolledCourses}</span>
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
            Available Doubts
              </button>
              </Link>
            <Link to={"rewards-collection"}  className="btn btn-primary mx-2 my-2">
            <button >
            Rewards Center
              </button>
              </Link>
           
           
          </div>
         
        </div>

        <div className="dashboardmainbar">
        
          <Routes>

         <Route path="/" element=
          {(availableDoubts.length<=0)? <>
          <div style={{display:"flex" ,flexDirection:"column",justifyContent:"center",alignItems:"center",width:"70vw"}}>
          <img style={{width:"55%"}} src="./empty.gif" alt="no doubts"  />
          <h1>No Doubts Found!! Try again Later</h1>
          </div>
          </> : availableDoubts.map((question,index)=>(
            <AvailableDoubts question={question}key={index} />
            
          ))}
          />
        <Route path="/profile" element={<UserProfile userData={userData} />} />
        <Route path="/rewards-collection" element={<RewardsCollection />} />
        <Route path="/solve-doubt/:id" element={<SolveDoubt loadPresentDoubts={loadPresentDoubts} />} />
       
        
           
           </Routes>
       
          
        </div>
      </div>
     
      <Footer />
    </>
  );
}

export default DoubtSolverDashboard;
