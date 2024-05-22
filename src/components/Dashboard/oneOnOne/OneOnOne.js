import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OneOnOne({ userData,linkString,user="user" }) {
    const navigate = useNavigate();
  const [uData, setUData] = useState(userData || { user: {} });
const roomNumber = 5500;
  useEffect(() => {
    setUData(userData || { user: {} });
  }, [userData]);

  const handleJoinRoom = ()=>{
navigate(`${linkString}one-to-one-call/${roomNumber}`)
  }

  return (
    <div className="ooocontainer">
      <div className="ooo-app">
        <h2>
          One on One <img src="/images/avatar.png" alt="icon" />
        </h2>
        <h5>Check Your Details</h5>
        <div className="d-flex flex-column">
          <div className="ooo-row">
            <b><i>Username: </i></b>
            <input
              type="text"
              id="input-box"
              placeholder="Add your Work"
              value={uData.user.name || "Username"}
              readOnly
            />
          </div>
          <div className="ooo-row">
            <b><i>Phone Number: </i></b>
            <input
              type="text"
              id="input-box"
              placeholder="Add your Work"
              value={uData.user.phoneNumber || "PhoneNumber"}
              readOnly
            />
          </div>
          {(user==="doubt-solver")?
          null
          
          : <div className="ooo-row">
          <b><i>Success Credits: </i></b>
          <input
            type="text"
            id="input-box"
            placeholder="Add your Work"
            value={uData.user.successCredits || "0"}
            readOnly
          />
        </div>}
          <div className="ooo-row">
            <b><i>Room Number: </i></b>
            <input
              type="text"
              id="input-box"
              placeholder="Add your Work"
              value={roomNumber}
              readOnly
            />
          </div>
          <div className="ooo-row">
            <b><i>User Email: </i></b>
            <input
              type="text"
              id="input-box"
              placeholder="Add your Work"
              value={uData.user.email || "User Email"}
              readOnly
            />
            <button onClick={handleJoinRoom}>Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneOnOne;
