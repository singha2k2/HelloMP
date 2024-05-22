import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ReusableCard({imageLink,cardBodyContent}) {

useEffect(() => {
  
}, [cardBodyContent.description])


  return (
    <div className="d-flex">
      <div
        className="card"
        style={{
          border: "1px solid rgb(228, 228, 228)",
          
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
          <h5 className="card-title">{cardBodyContent.heading}</h5>
          <p className="card-text">{cardBodyContent.description}</p>

          <Link 
          to={"/dashboard-user"}
          
           className="btn btn-success">
            Proceed to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReusableCard