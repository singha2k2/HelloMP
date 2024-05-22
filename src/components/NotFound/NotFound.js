import React, { useEffect, useState } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";

function NotFound() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }
  }, []);
  return (
    <div>
      <NavbarComponent isLogged={isLogged} />
      <div className="mt-2 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
        <h1>Oops !! Page Not Found</h1>
        <div id="notfoundimage"></div>
        <h5>
          The Page you want to go do not exists on our end!!{" "}
          <Link to={"/"}>Click Here </Link> to go home
        </h5>
      </div>
    </div>
  );
}

export default NotFound;
