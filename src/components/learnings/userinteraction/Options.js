import React from 'react';
import {useDrag} from "react-dnd";

function Options({listItem,removeFromSolutionList,solution=false}) {

    const [{isDragging},drag] = useDrag(()=>({
        type:'image',
        item: {id:listItem.id},
        collect:(monitor)=>({
            isDragging: !!monitor.isDragging(),
        }),
    }));


  return (
    <>
   
    <div className="cloud_bg">
              <img className="rounded" ref={drag} width={"50px"} src={listItem.imgUrl} />
              <span>{listItem.title} {solution?<i onClick={()=>removeFromSolutionList(listItem.id)} className="bi bi-trash-fill"></i>:null}</span>
            
              </div>
               </>

  )
}

export default Options