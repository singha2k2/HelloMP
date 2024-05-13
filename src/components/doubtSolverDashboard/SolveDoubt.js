import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import axios from "axios";
function SolveDoubt({loadPresentDoubts}) {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [doubtData, setdoubtData] = useState(null);
  const [solution, setSolution] = useState("");
  const [approved, setApproved] = useState(false);
  const [message,setMessage]= useState("Error in Submitting Solution");
const [userEmail,setUserEmail] = useState("");
  const loadDoubtInfoOnLoad = async (doubtId) => {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://learning-server-olive.vercel.app/api/findDoubtById?doubtId=${doubtId}`
      );

      const userData = response.data;

      setdoubtData(userData);

      setLoading(false);
    } catch (error) {
      console.error(error);
      const defaultUserData = {
        user: {
          name: "Username",
        },
      };
      setdoubtData(defaultUserData);
      setLoading(false);
    }
  };
  



  const handleSolutionSubmit = async (e) => {
   e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "https://learning-server-olive.vercel.app/api/updateDoubtSolution",
        {
          doubtId: id,
          solution: solution,
        }
      );
      
      if (response.data.success) {
        // Handle success if needed
        setMessage("Successfully Submitted Solution");
        setApproved(true);
        loadPresentDoubts();
        updateUserRecords();
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      setApproved(true);
    }
  };
  const updateUserRecords = async () => {
  
    setLoading(true);
    try {
      const response = await axios.put(
        "https://learning-server-olive.vercel.app/api/updateDoubtSolved",
        {
          doubtId: id,
          email: userEmail,
        }
      );
      
      if (response.data.success) {
        // Handle success if needed
        setMessage("Successfully Submitted Solution and Database Updated");
        setApproved(true);
        console.log("here");
        
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      setApproved(true);
    }
  };

  useEffect(() => {
    loadDoubtInfoOnLoad(id);
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  return (
    <div>
      {loading && <Loader />}

      <div className="todocontainer">
        <div className="todo-app">
          <h2>Doubt Solver </h2>
          <div className="toDo-row mx-2">
            <ul
              id="list-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <li>Doubt Id : {!doubtData ? "Doubt ID " : doubtData.doubtId}</li>
              <li>
                Doubt Heading : {!doubtData ? "Doubt ID " : doubtData.doubt}
              </li>
              <li>
                Doubt Solved :{" "}
                {!doubtData ? "Doubt ID " : doubtData.isSolved.toString()}
              </li>
              <form>
                <div class="form-group mx-3">
                  <label for="exampleInputEmail1">Provide Your Solution</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="exampleInputEmail1"
                    onChange={(e) => setSolution(e.target.value)}
                    aria-describedby="emailHelp"
                    placeholder="Your Solution"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    It will be reviewed before getting public
                  </small>
                </div>

                <button
                  type="submit"
                  onClick={handleSolutionSubmit}
                  disabled={!solution}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              {approved && <span>{message}</span>}
            </ul>
          </div>
          <ul id="list-container"></ul>
        </div>
      </div>
    </div>
  );
}

export default SolveDoubt;
