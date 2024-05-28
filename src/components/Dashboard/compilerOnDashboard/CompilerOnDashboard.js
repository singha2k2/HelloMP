import React from 'react'
import JavaCodeCompiler from '../../codeCompilers/javaCodeCompiler/javaCodeCompiler'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function CompilerOnDashboard() {
const {pStatement} = useParams();
  return (
    <div  className='d-flex flex-column justify-content-center align-items-center pt-5' style={{color:"white",fontSize: "large" ,fontStyle:"italic",
    background: "linear-gradient(135deg, #153677, #4e085f)",height:"100vh"}}>
        <h1>Practice Problem Statement</h1>
        <span>{pStatement}</span>
        <JavaCodeCompiler />
        <Link className='btn btn-success mb-5' to={"/dashboard-user"}>Finish</Link>
    </div>
  )
}

export default CompilerOnDashboard