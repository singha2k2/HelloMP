import React, { useEffect, useState } from "react";
import NavbarComponent from "../navbar/navbar";
import PremiumCards from "./PremiumCards";
import "./PremiumUi.css";

function PremiumUi() {

  const [userObj,setUserObj] = useState({});

  

  useEffect(()=>{
    setUserObj({
      userName : localStorage.getItem("userName"),
      email : localStorage.getItem("email"),
      phoneNumber : localStorage.getItem("phoneNumber"),

    })
   
  },[])

  return (
    <>
      <NavbarComponent isLogged={true} />
      <div className="premiumDashboard">
      <img id="avatarImage" width="500" height="500" src="./images/coins/big1.png" alt="mainavatar" style={{position:"absolute",top:"97px",right:"89px"}} ></img>
        <PremiumCards
          imageLink="./images/coins/1.png"
          heading="Buy Naive Pack"
          description="Get 20 Coins on Rs10"
          userData={userObj}
          amt={10}
          successCredits={20}
        />
        <PremiumCards
          imageLink="./images/coins/2.png"
          heading="Buy Premium Pack"
          description="Get 40 Coins on Rs25"
          userData={userObj}
          amt={25}
          successCredits={40}
        />
        <PremiumCards
          imageLink="./images/coins/3.png"
          heading="Buy Pro Pack"
          description="Get 80 Coins on Rs30"
          userData={userObj}
          amt={30}
          successCredits={80}
        />
        <PremiumCards
          imageLink="./images/coins/4.png"
          heading="Buy Pro+Premium Pack"
          description="Get 100 Coins on Rs40"
          userData={userObj}
          amt={40}
          successCredits={100}
        />
        <img id="avatarImage" width="500" height="500" src="./images/coins/big2.png" alt="mainavatar" style={{position:"absolute",left: "52px",bottom: "21px"}} ></img>

      </div>
    </>
  );
}

export default PremiumUi;
