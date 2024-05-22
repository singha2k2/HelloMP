import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function PremiumCards({ imageLink, heading, description, userData,amt=0 ,successCredits}) {



  function loadScript(src) {

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      "https://learning-server-olive.vercel.app/payments/checkout",
      {
        amount: amt,
        userData:userData,
        successCredits:successCredits
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const keyResponse = await axios.get(
      "https://learning-server-olive.vercel.app/keys/getKey"
    );

    const { KeyId } = keyResponse.data;

    if (!KeyId) {
      alert("Server error!!");
      return;
    }
    const { amount, id: order_id, currency } = result.data;

    const options = {
      
      key: KeyId,
      amount: amount.toString(),
      currency: currency,
      name: "Leanify Payment",
      description: "Payment for Getting Coins",
      
      order_id: order_id,
      callback_url:
        "https://learning-server-olive.vercel.app/payments/paymentVerification",

      prefill: {
        name: userData.userName,
        email: userData.email,
        contact: userData.phoneNumber,
      },
      notes: {
        address: "Learnify pvt ltd..",
      },
      theme: {
        color: "#121212",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="d-flex">
      <div
        className="card"
        style={{
          border: "1px solid rgb(228, 228, 228)",
          boxShadow: "5px 5px 15px rgb(174, 173, 173)",
          width: "26rem",
          margin: "15px",
          height: "50vh",
          background:
            "linear-gradient(294.57deg, rgba(255, 148, 88) 0%, rgba(252, 229, 172) 100%)",
          boxShadow: "0px 12px 56px rgba(255, 161, 22, 0.24)",
          borderColor: "rgba(255, 161, 22, 0.3)",
          borderRadius: "20px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          className="card-img-top"
          style={{
            width: "60%",
            display: "block",
            margin: "auto",
            marginTop: "50px",
            borderRadius: "10px",
          }}
          src={imageLink}
          alt="Card image cap"
        />

        <div
          className="card-body"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">{description}</p>

          <Button onClick={()=>displayRazorpay(amt)} className="btn btn-success">
            Get This Offer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PremiumCards;
