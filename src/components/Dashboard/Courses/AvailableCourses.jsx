import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function AvailableCourses({ course, handleEnrollmentStatus, enrolledCourses }) {
  const isEnrolled = enrolledCourses.includes(course.heading);

  return (
    <div className="d-flex">
      <div
        className="card"
        style={{
          border: "1px solid rgb(228, 228, 228)",
          boxShadow: "5px 5px 15px rgb(174, 173, 173)",
          width: "20rem",
          margin: "15px",
          height: "85%",
          borderRadius: "20px",
          zIndex: 9999,
        }}
      >
        <img
          className="card-img-top"
          style={{ width: "60%", display: "block", margin: "auto", marginTop: "10px",borderRadius:"10px" }}
          src={course.imageLink}
          alt="Card image cap"
        />

        <div className="card-body">
          <h5 className="card-title">{course.heading}</h5>
          <p className="card-text">{course.description}</p>

          {isEnrolled ? (
            <Link to={course.linktoredirect} className="btn btn-success" disabled={true}>
              Enrolled
            </Link>
          ) : (
            <Button onClick={() => handleEnrollmentStatus(course.heading)} className="btn btn-primary">
              Enroll Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvailableCourses;
