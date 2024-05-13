import React from 'react'
import "./invertedSection.css"

function InvertedSectionFormat({headline,imagesrc,alt}) {
  return (
    <section>
            <div className="left">
            <img id='avatarImage' width={500} height={500} src={imagesrc} alt={alt} />
            </div>
            <div className="right">
            <h1>{headline}</h1>
            {/* <input type='email' placeholder='Enter your email' className='email-input' /> */}
            <button className="btn btn-primary">Try Now</button>
            </div>
           
        </section >
  )
}

export default InvertedSectionFormat;