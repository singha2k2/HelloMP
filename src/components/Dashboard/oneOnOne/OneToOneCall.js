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
    const appID = 2002081683;
    const serverSecret = "d87f68078f4bc4a2c84f8056d41069d3";
    // const appID = 331638582;
    // const serverSecret = "283f94bdc33057ac4178624c96d7b2e5";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomNumber,

      uData.user.email || "User Email",
      uData.user.name || "User Name"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
        container : element,
        scenario : {
            mode : ZegoUIKitPrebuilt.OneONoneCall
        }
    })
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
