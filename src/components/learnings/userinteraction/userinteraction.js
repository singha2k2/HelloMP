import React, { useState } from "react";
import NavbarComponent from "../../navbar/navbar";
import "./userinteraction.css";
import { useDrop } from "react-dnd";
import Options from "./Options";
import ModalComponent from "../modals/Modal";

function Userinteraction() {
  const [showModal, setShowModal] = useState(false);
  const [iscORRECT, setiscORRECT] = useState(true);
  const questionslistArray = [
    { id: 1, title: "Create a Class", imgUrl: "./images/java_1.jpg" },
    { id: 6, title: "Use an Object", imgUrl: "./images/cloud_bg.jpg" },
    {
      id: 3,
      title: "Create a 2nd Private Field",
      imgUrl: "./images/java_3.jpg",
    },
    { id: 2, title: "Create a Private Field", imgUrl: "./images/java_2.jpg" },
    { id: 5, title: "Create an Object", imgUrl: "./images/java_5.jpg" },
    { id: 4, title: "Create a Method", imgUrl: "./images/java_4.jpg" },
  ];
  const [solutionslistArray, setSolutionListArray] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addToSolutionList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToSolutionList = (id) => {
    const pictureListFromId = questionslistArray.find((pic) => id === pic.id);
    if (pictureListFromId) {
      setSolutionListArray((oldList) => {
        if (!oldList.some((item) => item.id === pictureListFromId.id)) {
          return [...oldList, pictureListFromId];
        }
        return oldList;
      });
    }
  };

  const removeFromSolutionList = (id) => {
    const filteredList = solutionslistArray.filter((item) => item.id !== id);
    setSolutionListArray(filteredList);
  };

  const isSortedCorrectly = () => {
    const solutionIds = solutionslistArray.map((item) => item.id);
    const questionIds = questionslistArray.map((item) => item.id);
    
    let isCorrect = true;
    if (solutionIds.length !== questionIds.length) {
      isCorrect = false;
    } else {
      for (let i = 0; i < solutionIds.length; i++) {
        if (solutionIds[i] !== questionIds[i]) {
          isCorrect = false;
          break;
        }
      }
    }
  
    setShowModal(true);
    setiscORRECT(isCorrect);
  };

  const onCloseModal =()=>{
    setShowModal(false);
  }

  return (
    <>
      <NavbarComponent isLogged={true} />

      <div className="intractive-container">
        <div className="intractive-container-draggable">
          {questionslistArray.map((item) => (
            <Options key={item.id} listItem={item} />
          ))}
        </div>
        <div ref={drop} className="intractive-container-droppable">
          {solutionslistArray.map((item) => (
            <Options
              key={item.id}
              listItem={item}
              removeFromSolutionList={removeFromSolutionList}
              solution={true}
            />
          ))}
        </div>
      </div>
      <div className="heading_container">
        <span>
          Arrange the Following in Order (Drag Image from Left and Drop to
          Right) *
        </span>
        <button
          className="submit_button btn btn-primary"
          onClick={isSortedCorrectly}
        >
          Check Answer
        </button>
      </div>

      {showModal && <ModalComponent isCorrect={!iscORRECT} onCloseModal={onCloseModal} modalTitle={(solutionslistArray.length !== questionslistArray.length) ? "Please Complete Your Task" : (iscORRECT ? "Try again !!" : "Congratulations")} modalBody={(solutionslistArray.length !== questionslistArray.length) ? "Select all the choices present in left !!" : (iscORRECT ? "You have made wrong choice please do again!!" : "Lets Proceed to next Module!")}/>}
  </>
  );
}

export default Userinteraction;
