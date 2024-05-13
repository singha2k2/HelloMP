import React  from 'react';
import Carousel from 'react-bootstrap/Carousel';
import crouselImage1 from '../../../images/loginCarousel/crousel_image1.jpg';
import crouselImage2 from '../../../images/loginCarousel/crousel_image2.jpg';
import crouselImage3 from '../../../images/loginCarousel/crousel_image3.jpg';
import option1 from '../../../images/learningsOptions/oops.png';
import option2 from '../../../images/learningsOptions/compiler.png';
import './learningOptionsPage.css';

import Card from 'react-bootstrap/Card'; 
import { Link } from 'react-router-dom';


const carouselBackgroundStyles = {
    position: 'relative',
    filter: 'blur(2px)',
    height: '100px'
};

function CarouselFadeExample() {
    return (
        <Carousel fade interval={1500} style={carouselBackgroundStyles}>
            <Carousel.Item>
                <img src={crouselImage1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img src={crouselImage2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img src={crouselImage3} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
}

function LearningOptionsPage() {



    const map = [
        {title: 'Oops in Java',image:option1,link:'/learn-oops-in-java'},
        {title: 'Web Based Compiler',image:option2,link:'/web-compiler'},
        {title: 'Java Based Compiler',image:option1,link:'/java-compiler'},
        {title: 'Recussion on Hands',image:option1,link:'/learning-options'},
        
        
    ]

    const cardStyles = {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap : 'wrap',
        gap: '20px',
        zIndex: 1000,

    };

    return (
        <div>
            <CarouselFadeExample />
            <div style={cardStyles}>
            {map.map((item) => (
          <Link to={item.link} key={item.title} className='text-decoration-none'>
            <Card className="text-center rounded cards">
              <Card.Body style={{ flexDirection: 'column' }} className="d-flex justify-content-center align-items-center">
                <img src={item.image} width={"50%"} alt={item.title} />
                <h4>{item.title}</h4>
              </Card.Body>
            </Card>
          </Link>
        ))}
                
            </div>
        </div>
    )
}

export default LearningOptionsPage