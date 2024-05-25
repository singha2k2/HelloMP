import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
function OneToOneCall({ userData }) {
  const [uData, setUData] = useState(userData || { user: {} });

  const { roomNumber } = useParams();

  useEffect(() => {
    setUData(userData || { user: {} });
  }, [userData]);

  const myMeeting = async (element) => {
    // Replace with your own appID and serverSecret
    const appID = 407876073;
    const serverSecret = "f97722428a7ce296d51489be65ff1957";
    
    if (!roomNumber) {
      console.error("Room number is missing.");
      return;
    }
    
    if (!uData.user.name) {
      console.error("User name is missing.");
      return;
    }
    
    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomNumber,
        uData.user.email,
        uData.user.name || "UserName"
      );
     
      
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      
      
      console.log(zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall
        }
      }));
    } catch (error) {
      console.error("Error generating kit token or joining room:", error);
    }
  };

  return (
    <div className="ooocontainer">
      <div className="ooo-app">
    
        <div style={{height:"80vh"}} ref={myMeeting}></div>
      </div>
    </div>
  );
}

export default OneToOneCall;
