import React, { useEffect, useState } from "react";
import NavbarComponent from "../navbar/navbar";
import useWindowSize from "react-use/lib/useWindowSize";
import ReactConfetti from "react-confetti";
import PremiumCards from "./PremiumCards";
import ReusableCard from "./ReusableCard";
import axios from "axios";
import queryString from "query-string";

function PremiumSuccess() {
  const { width, height } = useWindowSize();
  const [existingCoins, setExistingCoins] = useState(
    parseInt(localStorage.getItem("successCredits")) || 0
  );

  const [cardBodyContent,setCardBodyContent] = useState({heading:"Transaction Success !!",description:`New Coins are ${existingCoins}`});

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const transactionId = queryParams.reference;
    const amount = parseInt(queryParams.amount);
    const successCredits = parseInt(queryParams.successCredits);

    const email = localStorage.getItem("email");
    updatePaymentsAndSuccessCredits(
      email,
      transactionId,
      amount,
      successCredits
    );
  }, []);

  const updatePaymentsAndSuccessCredits = async (
    email,
    transactionId,
    amount,
    successCredits
  ) => {
    try {
      const result = await axios.put(
        `https://learning-server-olive.vercel.app/api/updatePaymentsMade`,
        {
          email: email,
          payment: {
            transactionId: transactionId,
            amount: amount,
            successCreditAddition: successCredits,
          },
        }
      );
      if (!result) {
        console.log("Error in Updating Details");
        return;
      }

      const response = await axios.put(
        `https://learning-server-olive.vercel.app/api/updateSuccessCredits`,
        {
          email: email,
          successCredits: existingCoins + successCredits,
        }
      );

      if (!response) {
        console.log("Error in Updating Details");
        return;
      }
      localStorage.setItem('successCredits', existingCoins + successCredits);
      setExistingCoins(existingCoins + successCredits); 
      setCardBodyContent({heading:"Transaction Success !!",description:`New Coins are ${existingCoins + successCredits}`})
    } catch (error) {
      // Handle error, update UI accordingly
      console.error("Error updating payments:", error);
    }
  };

  return (
    <>
      <NavbarComponent isLogged={true} />

      <ReactConfetti style={{ zIndex: "-1" }} width={width} height={height} />
      <div
        style={{ height: "93vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <ReusableCard imageLink={"./images/coins/coin.gif"} cardBodyContent={cardBodyContent} />
      </div>
    </>
  );
}

export default PremiumSuccess;
