import React, { useEffect, useState } from 'react'
import Loader from '../loader/loader'
import axios from 'axios';

function AllPayments() {
    const[loading,setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState([]);


useEffect(()=>{

    
    loadPayments();
},[])

const loadPayments = async () => {
    try {
        const response = await axios.get(
            `https://learning-server-olive.vercel.app/payments/allPayments`
        );

        if (!response || !response.data || !response.data.allPayments || response.data.allPayments.length === 0) {
            setPaymentData([
                {
                    userEmail: "No payments found",
                    phoneNumber: "NA",
                    amount: "NA",
                    successCredits: "NA",
                    razorpay_order_id: "NA",
                    razorpay_payment_id: "NA",
                    razorpay_signature: "NA"
                }
            ]);
        } else {
            setPaymentData(response.data.allPayments);
        }
    } catch (error) {
        console.error("Error fetching payments:", error);
        setPaymentData([
            {
              userEmail: "Error fetching payments",
              phoneNumber: "NA",
              amount: "NA",
              successCredits: "NA",
                    razorpay_order_id: "NA",
                    razorpay_payment_id: "NA",
                    razorpay_signature: "NA"
            }
        ]);
    } finally {
        setLoading(false);
    }
};


  return (
    <div>
      {loading && <Loader />}

      <div className="todocontainer">
        <div className="todo-app">
          <h2>All Transactions </h2>
          <div className="toDo-row mx-2">
            <ul
              id="list-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
             
            </ul>
          </div>
          <div style={{ overflowY: "scroll", maxHeight: "435px" }}>
            <table className="table">
              <thead>
                <tr>
                <th scope="col">Sno.</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Success Credits</th>
                  <th scope="col">Payment Id</th>
                  <th scope="col">Signatures</th>
                  
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment, index) => (
                  <tr key={index}>
                     <td>{index+1}</td>
                   
                    <td className='text text-dark'><i>{payment.userEmail}</i></td>
                    <td className='text text-primary'>{payment.phoneNumber.toString()}</td>
                    <td className='text text-success'>+{payment.amount.toString()}</td>
                    <td className='text text-dark'><i>{payment.successCredits}</i></td>
                    <td className='text text-primary'>{payment.razorpay_order_id.toString()}</td>
                    <td className='text text-success'>{payment.razorpay_payment_id.toString()}</td>
                    <td className='text text-success'>{payment.razorpay_signature.toString()}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPayments