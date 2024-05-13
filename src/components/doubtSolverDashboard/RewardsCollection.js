import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import axios from "axios";

function RewardsCollection() {
  const [loading, setLoading] = useState(false);
  const [uData, setuData] = useState(null);

  const loadUserInfoOnLoad = async (userEmail) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://learning-server-olive.vercel.app/api/findDoubtSolverInfo",
        {
          params: {
            email: userEmail,
          },
        }
      );

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
   

   
      const userEmail = localStorage.getItem("email");
      loadUserInfoOnLoad(userEmail);
   
  }, []); 


  return (
    <>
      {loading && <Loader />}

      <div className="todocontainer">
        <div className="todo-app">
          <h2>Rewards Center</h2>
          <div className="toDo-row">
            <ul id="list-container">
             
              <li>Name: {uData?.user?.name || "Username"}</li>
              <span>Name: {uData?.user?.name || "Username"}</span>
              
              <li>
                Number of Doubts Solved:{" "}
                {uData?.user?.numberOfDoubtsSolved || 0}
              </li>
            </ul>
          </div>
          <ul id="list-container"></ul>
        </div>
      </div>
    </>
  );
}

export default RewardsCollection;
