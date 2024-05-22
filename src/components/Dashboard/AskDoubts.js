import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import axios from "axios";
import { Alert } from "react-bootstrap";
function SolveDoubt({ handleSuccessCreditUpdation }) {
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [doubtData, setdoubtData] = useState(null);
  const [Question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [approved, setApproved] = useState(false);
  const [availableDoubts, setAvailableDoubts] = useState([]);
  const [message, setMessage] = useState("Error in Submitting Question");
  const [existingCoins, setExistingCoins] = useState(0);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (existingCoins < 5) {
      setShow(true);
      
      setLoading(false);
      return;
    }
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

        try {
          const creditsResponse = await axios.put(
            `https://learning-server-olive.vercel.app/api/updateSuccessCredits`,
            {
              email: email,
              successCredits: existingCoins - 5,
            }
          );
  
          console.log(creditsResponse);
  
          if (!creditsResponse.data.success) {
            console.log("Error in Updating Details");
            setLoading(false);
            return;
          }
          localStorage.setItem("successCredits", existingCoins - 5);
          setExistingCoins(existingCoins - 5);
          handleSuccessCreditUpdation();
        } catch (error) {
          console.log(error); // Log the error response data
          setLoading(false);
        }
        return;

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
    setExistingCoins(parseInt(localStorage.getItem("successCredits")) );
setEmail(localStorage.getItem("email"))
  }, [approved,existingCoins,localStorage.getItem("successCredits")]);

  return (
    <div>
      {loading && <Loader />}
      {show && 
      <Alert key={"primary"} variant={"primary"} onClose={() => setShow(false)} dismissible>
      You don't have enough coins.
      <Alert.Link href="/get-more-in-less">Purchase Here</Alert.Link> more Coins
      you like.
    </Alert>
    }
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
