import React, { useEffect, useLayoutEffect, useState } from 'react';
import "./landingPage.css";
import Navbar from '../navbar/navbar';
import SectionFormat from './sectionFormat/sectionFormat'; 
import Tiles from './tilesGridSection/tiles';
import Footer from '../footer/footer';
import InvertedSectionFormat from './invertedSection/invertedSection';
import useSound from "use-sound";
import electicPiano from "../../audio/chill-electric.mp3";

function LandingPage() {
    // const [play] = useSound(electicPiano, { autoplay: true }); 
    // useLayoutEffect(() => {
    //     play(); 
    // }, [play]);

    const[isLogged,setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token!==null){
            setIsLogged(true);
        }
    
    }, [])
    

    return (
        <>
            <Navbar isLogged={isLogged}/>
            <div className='landing-page'>
                <SectionFormat headline={"Learn the Way You Like 🥰"} description={"Let AI make the Study Plan"} imagesrc={"./images/avatar.png"} alt={"mainavatar"} />
                <Tiles />
                <SectionFormat headline={"🥹 AI Integrated Platform "} imagesrc={"./images/robot.png"} alt={"mainavatar"} />
                <InvertedSectionFormat headline={"Uplifting the Study to Next Level ✌️"} imagesrc={"./images/books.png"} alt={"mainavatar"} />
            </div>
            <Footer />
          
            
        </>
    )
}

export default LandingPage