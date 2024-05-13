import React from 'react'
import "./sectionFormat.css"
// import { useEmail } from '../../../context/UserContext';

function SectionFormat({headline,description,imagesrc,alt}) {
  
  // const {email,setEmailValue} = useEmail();

  const handleFormSubmit = (e) => {
    e.preventDefault() ;
    const email = e.target[0].email.value;
    console.log(email);
  };
  
  return (
    <section>
            <div className="left">
            <h1>{headline}</h1>
            <h5 className='mb-3'>{description}</h5>
            <form  action="/signup" className='d-flex flex-column'>
            <input type='email' required placeholder='Enter your email' name='email' className='email-input' />
            <button className="btn btn-primary">{(imagesrc.includes('robot')?'Get Started':'Start Trial')}</button>
            </form>
            </div>
            <div className="right">
                <img id='avatarImage' width={500} height={500} src={imagesrc} alt={alt} />
            </div>
            
        </section >
  )
}

export default SectionFormat