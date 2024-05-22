import React, { useEffect, useState } from 'react';
import Loader from '../../loader/loader';
import axios from 'axios';

function AllDoubtsSolved() {
  const [userData, setUserData] = useState(null);
  const [dsData, setDSData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async (userEmail) => {
      try {
        const response = await axios.get(
          "https://learning-server-olive.vercel.app/api/findDoubtSolverInfo",
          {
            params: {
              email: userEmail,
            },
          }
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    if (!userData) return; // Exit if userData is not available yet

    const fetchDoubtData = async (doubtId) => {
      try {
        const response = await fetch(`https://learning-server-olive.vercel.app/api/findDoubtById?doubtId=${doubtId}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error('Failed to fetch data for doubt ID:', doubtId);
          return null;
        }
      } catch (error) {
        console.error('Error fetching doubt data:', error);
        return null;
      }
    };

    const loadData = async () => {
      try {
        const fetchedData = await Promise.all(userData.doubtsSolved.map(doubtId => fetchDoubtData(doubtId)));
        setDSData(fetchedData.filter(data => data !== null)); // Filter out null responses
      } catch (error) {
        console.error('Error fetching doubt data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userData]);

  return (
    <div>
      {loading && <Loader />}
      <div className="todocontainer">
        <div className="todo-app">
          <h2>All Solved Doubts</h2>
          <div className="toDo-row mx-2">
            <ul
              id="list-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Content can be added here if necessary */}
            </ul>
          </div>
          <div style={{ overflowY: "scroll", maxHeight: "435px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sno.</th>
                  <th scope="col">Doubt Id</th>
                  <th scope="col">Doubt</th>
                  <th scope="col">Solution</th>
                </tr>
              </thead>
              <tbody>
                {dsData.map((doubt, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='text text-dark'><i>{doubt.doubtId || "No Data"}</i></td>
                    <td>{doubt.doubt || "No Data"}</td>
                    <td>{doubt.solution || "No Data"}</td>
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

export default AllDoubtsSolved;
