import React, { useEffect, useState } from "react";
import Loader from "../../loader/loader";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserProfile({ userData}) {
  const [loading, setLoading] = useState(false);
  const [uData, setuData] = useState(null);
  const [uType, setUType] = useState("");
  const { email, reqType } = useParams();

  const loadUserInfoOnLoad = async (userEmail,uType) => {
    
    setLoading(true);
    try {
      let response;
      if (uType === "user") {
        response = await axios.get(
          "https://learning-server-olive.vercel.app/api/findUserInfo",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setUType("user");
      
      } else if (uType === "admin") {
        response = await axios.get(
          "https://learning-server-olive.vercel.app/api/findAdminInfo",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setUType("admin");
       
      } else {
        response = await axios.get(
          "https://learning-server-olive.vercel.app/api/findDoubtSolverInfo",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setUType("doubtsolver");
      
      }

      const userData = response.data;
     
      setuData(userData);

      setLoading(false);
    } catch (error) {
      console.error(error);
      const defaultUserData = {
        user: {
          name: "Username",
          email: "Email",
          phoneNumber: "Phone Number",
          age: "Age",
          numberOfDoubtsSolved: 0,
        },
      };
      setuData(defaultUserData);
      setLoading(false);
    }
  };

  useEffect(() => {
    let userRType = "user";
    if (!reqType) {
      const userType = localStorage.getItem("userType");
      userRType = userType;
     
    
    }else{
      userRType = reqType;
    }
   

    if (!email) {
      const userEmail = localStorage.getItem("email");
      loadUserInfoOnLoad(userEmail,userRType);
    } else {
      loadUserInfoOnLoad(email,userRType);
    }
  }, [email, reqType, userData]); 

  return (
    <>
      {loading && <Loader />}

      <div className="todocontainer">
        <div className="todo-app">
          <h2>User Profile</h2>
          <div className="toDo-row">
            <ul id="list-container">
              <li>Name: {uData?.user?.name || "Username"}</li>
              <li>Email Address: {uData?.user?.email || "Email"}</li>
              <li>Phone Number: {uData?.user?.phoneNumber || "Phone Number"}</li>
              <li>Age: {uData?.user?.age || "Age"}</li>

              {uType === "doubtsolver" && (
                <li>
                  Number of Doubts Solved: {uData?.user?.numberOfDoubtsSolved || 0}
                </li>
              )}
              {uType === "user" && (
                <li>
                  Number of Courses Enrolled : {uData?.user?.coursesEnrolled?.length || 0}
                </li>
              )}
            </ul>
          </div>
          <ul id="list-container"></ul>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
