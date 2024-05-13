import React from 'react'
import './webCodeCompiler.css';
import NavbarComponent from '../../navbar/navbar';


function run(){
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode +"<style>" + cssCode + "</style>" ;
    output.contentWindow.eval(jsCode);
}


function WebCodeCompiler() {

  return (
    <>
   
    <div id="webCodeCompiler" >
    <div className='cover'>
       <div className="container">
        <div className="left">
            <label><i className="fa-brands fa-html5"></i>HTML</label>
            <textarea id="html-code" placeholder='<h1> hello</h1>' onKeyUp={run} ></textarea>

            <label><i className="fa-brands fa-css3-alt"></i>CSS</label>
            <textarea id="css-code"  placeholder='h1{color:red}'  onKeyUp={run} ></textarea>

            <label><i className="fa-brands fa-square-js"></i>JavaScript</label>
            <textarea id="js-code" placeholder='h1.getElementByTag()' onKeyUp={run} ></textarea>
        </div>
        <div className="right">
            <label><i className="fa-solid fa-play"></i>Output</label>
            <iframe title='output' id ="output" ></iframe>
        </div>
    </div>
    
    </div>
    </div>
    </>
  )
}

export default WebCodeCompiler
