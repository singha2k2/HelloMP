import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../loader/loader";
import axios from "axios";

function AllCompilerOptions() {
  const [compilerOptions, setCompilerOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const getAllLanguages = async () => {
    setIsLoading(true);
    await axios
      .get("https://learning-server-olive.vercel.app/core/get-all-languages")
      .then((response) => {
        setCompilerOptions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllLanguages();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = compilerOptions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const returnDivElements = () => {
    return currentItems.map((language, index) => (
      <div className="d-flex " key={index}>
        <div
          className="card"
          style={{
            border: "1px solid rgb(228, 228, 228)",
            boxShadow: "5px 5px 15px rgb(174, 173, 173)",
            width: "20rem",
            margin: "15px",
            height: "42vh",
            borderRadius: "20px",
            zIndex: 9999,
          }}
        >
          <img
            className="card-img-top"
            style={{
              width: "60%",
              display: "block",
              margin: "auto",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            src={"/images/minions/person.jpg"}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title"><b>{language.name.toUpperCase() || "Language Name"}</b></h5>
            <p className="card-text">
              <strong>Language:{language.name || "Language Name"}</strong>
            </p>

            <Link
              to={`/dashboard-user/love-to-code/${language.name}`}
              className="btn btn-success"
            >
              Code Now
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(compilerOptions.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="d-flex">
        
        <div className="d-flex flex-wrap">
          {isLoading ? <Loader /> : returnDivElements()}
        </div>
        <nav style={{ marginRight: '20px' }}>
          
          <ul className="pagination flex-column pt-5  text text-light">
            <h1>More Options<i class="bi bi-arrow-down-circle-fill"></i></h1>
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AllCompilerOptions;
