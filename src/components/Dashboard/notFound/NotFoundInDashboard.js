import React from "react";
import { Link } from "react-router-dom";

function NotFoundInDashboard() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div id="notfoundimagedasboard" ></div>
        <h1 style={{color:"white"}}>Oops !! Page Not Found</h1>
        <h5 style={{color:"white"}}>
          The Page you want to go do not exists on our end!!{" "}
          <Link to={"/dashboard-user/"}>Click Here </Link> to go home
        </h5>
      </div>
    </div>
  );
}

export default NotFoundInDashboard;
