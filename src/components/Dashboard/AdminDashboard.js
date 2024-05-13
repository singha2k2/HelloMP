import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Import useSelector hook
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";
import UserProfile from "./profile/UserProfile";
import "../Dashboard/Dashboard.css";
import Footer from "../footer/footer";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import Loader from "../loader/loader";



function AdminDashboard() {
    const user = useSelector((state) => state.user);

    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [enrolledCourses, seetEnrolledCourses] = useState([]);
    const [dayTime, setDayTime] = useState("");
    const [noEnrolledCourses, SetNoEnrolledCourses] = useState(0);
    const [doubt, setDoubts] = useState([]);

    const availableCourses = [
        {
            _id: 1,
            imageLink: "./images/dashboard/java_course_1.jpg",
            heading: "Learn Java Basics",
            description: "Premium content to Learn Java Basics",
            linktoredirect: "/learn-oops-in-java",
            isCompleted: false,
            isEnrolled: false,
        },
        {
            _id: 2,
            imageLink: "./images/dashboard/java_course_2.jpg",
            heading: "Learn Inheritance",
            description:
                "Premium content to Java Access Modifiers (Inheritance Basics)",
            linktoredirect: "/learn-oops-in-java",
            isCompleted: false,
            isEnrolled: false,
        },
        {
            _id: 3,
            imageLink: "./images/dashboard/java_course_3.jpg",
            heading: "Learn Polymorphism",
            description: "Premium content to learn Polymorphism",
            linktoredirect: "/learn-oops-in-java",
            isCompleted: false,
            isEnrolled: false,

        },
        {
            _id: 4,
            imageLink: "./images/dashboard/java_course_3.jpg",
            heading: "Learn Encapsulation",
            description: "Premium content to learn Encapsulation",
            linktoredirect: "/learn-oops-in-java",
            isCompleted: false,
            isEnrolled: false,
        },
        {
            _id: 5,
            imageLink: "./images/dashboard/java_course_3.jpg",
            heading: "Learn Abstraction",
            description: "Premium content to learn Abstraction",
            linktoredirect: "/learn-oops-in-java",
            isCompleted: false,
            isEnrolled: false,
        },
    ];

    const handleEnrollmentStatus = async (heading) => {
        setLoading(true);
        try {
            const response = await axios.post("https://learning-server-olive.vercel.app/api/updateCoursesEnrolled", {
                email: email,
                courseHeading: heading
            });

            if (response.data.success) {
                seetEnrolledCourses(prevEnrolledCourses => [...prevEnrolledCourses, heading]);
                SetNoEnrolledCourses(enrolledCourses.length)
            }
            SetNoEnrolledCourses(enrolledCourses.length)
            setLoading(false);
        } catch (error) {
            alert(error.response.data); // Log the error response data
            setLoading(false);
        }
    }

    const setTime = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setDayTime("Good Morning ");

        } else if (currentHour >= 12 && currentHour < 17) {
            setDayTime("Good Afternoon ");

        } else {
            setDayTime("Good Evening ");

        }
    }

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://learning-server-olive.vercel.app/api/getAllUsers");
            setUsers(response.data.users);
        } catch (e) {
            alert(e);
        }
    }

    const getAllDobtSolvers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://learning-server-olive.vercel.app/api/getAllDoubtSolver");
            setDoubts(response.data.users);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        getAllDobtSolvers();
    }, [])


    const loadUserInfoOnLoad = async (userEmail) => {
        setLoading(true);
        try {
            const response = await axios.get("https://learning-server-olive.vercel.app/api/findAdminInfo", {
                params: {
                    email: userEmail
                }
            });
            const userData = response.data;
            setUserData(userData);

            //seetEnrolledCourses(userData.user.coursesEnrolled);
            //SetNoEnrolledCourses(userData.user.coursesEnrolled.length)
            setLoading(false);
        } catch (error) {
            alert(error);
            const defaultUserData = {
                user: {
                    name: "Username"
                }
            };
            setUserData(defaultUserData);
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        }
        const userEmail = localStorage.getItem("email");
        setTime();
        setEmail(userEmail);
        loadUserInfoOnLoad(userEmail);

    }, [noEnrolledCourses]);

    useEffect(() => {
        getAllUsers();
    }, [])



    return (
        <>

            {loading && <Loader />}
            <div className="mainbar">
                <NavbarComponent isLogged={true} />
            </div>

            <div className="homepage">
                <div
                    className="dashboardsidebar"
                    style={{
                        background: darkMode
                            ? "rgba(0, 0, 0, 0.7)"
                            : "rgba(255, 255, 255, 0.7)",
                    }}
                >
                    <div className="profile-container">
                        <div className="image-container">
                            <div className="user-img">
                                {" "}
                                <img src="./images/profile.png" />
                            </div>
                            <span>{dayTime}{!userData ? "Username " : userData.user.name.substring(0, 5)}</span>
                        </div>
                        <div className="mx-5 header-user-container">

                        </div>
                    </div>
                    <div className="sidebar-links">
                        <Link to={`profile/${email}/admin`} className="btn btn-primary mx-2 my-2">
                            <button >
                                My Profile
                            </button>
                        </Link>
                        <Link to={""} className="btn btn-primary mx-2 my-2">
                            <button >
                                Available Students
                            </button>
                        </Link>
                        <Link to={`doubt-solver`} className="btn btn-primary mx-2 my-2">
                            <button >
                                Available Doubt Solver
                            </button>
                        </Link>

                    </div>
                </div>
                <div className="dashboardmainbar">
                    <Routes>
                        <Route path="/profile/:email/:reqType" element={<UserProfile />} />
                        <Route path="/doubt-solver" element={<div>
                            <div className="d-flex">
                                {doubt.map((user, index) => (
                                    <div key={index} className="card" style={{
                                        border: "1px solid rgb(228, 228, 228)",
                                        boxShadow: "5px 5px 15px rgb(174, 173, 173)",
                                        width: "20rem",
                                        margin: "15px",
                                        height: "50%",
                                        borderRadius: "20px",
                                        zIndex: 9999,
                                    }}>
                                        <img className="card-img-top" style={{ width: "60%", display: "block", margin: "auto", marginTop: "10px", borderRadius: "10px" }} src="./images/dashboard/java_course_1.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <Link to={`/dashboard-admin/profile/${user.email}/doubt-solver`}>
                                                <button className="btn btn-primary align-items-center">{user.name}</button>
                                            </Link>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>} />
                        <Route path="/" element={
                            <div className="d-flex">
                                {users.map((user, index) => (
                                    <div key={index} className="card" style={{
                                        border: "1px solid rgb(228, 228, 228)",
                                        boxShadow: "5px 5px 15px rgb(174, 173, 173)",
                                        width: "20rem",
                                        margin: "15px",
                                        height: "50%",
                                        borderRadius: "20px",
                                        zIndex: 9999,
                                    }}>
                                        <img className="card-img-top" style={{ width: "60%", display: "block", margin: "auto", marginTop: "10px", borderRadius: "10px" }} src="./images/dashboard/java_course_1.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <Link to={`profile/${user.email}/user`}>
                                                <button className="btn btn-primary align-items-center">{user.name}</button>
                                            </Link>
                                            <p className="card-text text-center">Enrolled in {user.coursesEnrolled.length} Courses</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        } />
                    </Routes>

                </div>
            </div>
            <div className="mt-32">
                <Footer />
            </div>

        </>
    );
}

export default AdminDashboard;
