import React from 'react'
import { Link } from 'react-router-dom'

function AvailableDoubts({question,imageLink = "./images/dashboard/java_course_1.jpg"}) {
  return (
    <div className="d-flex">
      <div
        className="card"
        style={{
          border: "1px solid rgb(228, 228, 228)",
          boxShadow: "5px 5px 15px rgb(174, 173, 173)",
          width: "20rem",
          margin: "15px",
          height: "45%",
          borderRadius: "20px",
          zIndex: 9999,
        }}
      >
        <img
          className="card-img-top"
          style={{ width: "60%", display: "block", margin: "auto", marginTop: "10px",borderRadius:"10px" }}
          src={imageLink}
          alt="Card image cap"
        />

        <div className="card-body">
          <h5 className="card-title">{question.doubtId}</h5>
          <p className="card-text">{question.doubt}</p>

        
            <Link to={`solve-doubt/${question.doubtId}`}  className="btn btn-primary" disabled={true}>
              Solve Now
            </Link>
         
           
         
        </div>
      </div>
    </div>
  )
}

export default AvailableDoubts