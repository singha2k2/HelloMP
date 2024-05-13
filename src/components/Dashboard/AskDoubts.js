import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import axios from "axios";
function SolveDoubt({ loadPresentDoubts }) {
  const [loading, setLoading] = useState(false);
  const [doubtData, setdoubtData] = useState(null);
  const [Question, setQuestion] = useState("");
  const [approved, setApproved] = useState(false);
  const [availableDoubts, setAvailableDoubts] = useState([]);
  const [message, setMessage] = useState("Error in Submitting Question");

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://learning-server-olive.vercel.app/api/addDoubt",
        {
          doubt: Question,
        }
      );

      if (response.data.success) {
        // Handle success if needed
        setdoubtData(response.data);
        setMessage("Successfully Submitted Question");
        setApproved(true);
        console.log(response.data);
      } else {
        setdoubtData(response.data);
        setMessage(response.data.error);
        console.log(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.toString());
      setLoading(false);
      setApproved(true);
    }
  };

  const loadPresentAllDoubts = async () => {
    try {
      const response = await axios.get(
        "https://learning-server-olive.vercel.app/api/getAllDoubts"
      );

      const userData = response.data;

      setAvailableDoubts(userData.users);

      setLoading(false);
    } catch (error) {
      console.error(error);
      const defaultUserData = {
        user: {
          name: "Username",
        },
      };
      setAvailableDoubts(defaultUserData);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresentAllDoubts();
  }, [approved]);

  return (
    <div>
      {loading && <Loader />}

      <div className="todocontainer">
        <div className="todo-app">
          <h2>Doubt Asker </h2>
          <div className="toDo-row mx-2">
            <ul
              id="list-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <form>
                <div class="form-group mx-3">
                  <label for="exampleInputEmail1">Provide Your Question</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="exampleInputEmail1"
                    onChange={(e) => setQuestion(e.target.value)}
                    aria-describedby="emailHelp"
                    placeholder="Your Question"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    Will be Solved within 2 hrs
                  </small>
                </div>

                <button
                  type="submit"
                  onClick={handleQuestionSubmit}
                  disabled={!Question}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              <li>
                Doubt Id :{" "}
                {!doubtData
                  ? "Your Doubt ID will be shown here "
                  : doubtData._id}
              </li>
              {approved && <span>{message}</span>}
            </ul>
          </div>
          <div style={{ overflowY: "scroll", maxHeight: "300px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Doubt Id</th>
                  <th scope="col">Doubt</th>
                  <th scope="col">Solved Status</th>
                  <th scope="col">Solution</th>
                </tr>
              </thead>
              <tbody>
                {availableDoubts.map((doubt, index) => (
                  <tr key={index}>
                    <td>{doubt.doubtId}</td>
                    <td>{doubt.doubt}</td>
                    <td>{doubt.isSolved.toString()}</td>
                    <td>{doubt.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolveDoubt;
