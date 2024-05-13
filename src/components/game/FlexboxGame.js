import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FlexboxGame.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrog, faBug } from '@fortawesome/free-solid-svg-icons';
const FlexboxGame = () => {
    const [justifyContentValue, setJustifyContentValue] = useState('end');
    const [isCorrect, setIsCorrect] = useState(false);
    const [emptyChecker, setEmptyChecker] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.value === '') {
            setJustifyContentValue(event.target.value);
            setEmptyChecker(true);


        }
        else {
            setEmptyChecker(false);
            setJustifyContentValue(event.target.value);

        }
    };

    const handleSubmit = () => {
        const correctValue = 'start';
        setIsCorrect(justifyContentValue === correctValue);

        if (justifyContentValue === correctValue) {
            alert('Correct answer! The circle is inside the square.');
        } else {
            alert('Wrong answer. Try again!');
        }
    };

    const handleReset = () => {
        setJustifyContentValue('');
        setEmptyChecker(true);
    };

    return (
        <div id='gamecontainer'>
        <div className="container">
            <h2 className="text-center pt-8">Let us play a game to understand FlexBox</h2>
            <div className='hh'>
                <div className="d-flex justify-content-between">
                    <div className="mt-8">
                        <p className="h4">
                            Following are the instructions for the game:<br />
                            Welcome to Flexbox Froggy, a game where you help Froggy and friends  <br />
                            by writing CSS code! Guide this frog to the insect on the left by using the  <br />
                            justify-content property. <br />
                            <br />
                            <b>
                            Justify Content:<br />

                            Aligns flex items along the main axis of the container.<br />
                            Common values include flex-start , flex-end, center, <br />
                            space-between, and space-around.
                            </b>
                        </p>
                        
                    </div>
                    <div>
                        <img
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRESjGeVZhShpXDmZjJybscG9hVpgX8Vg6BeZeUlIDTaQ1Pr6uh"
                            alt="FlexBox"
                            className="mt-3"
                            style={{ height: '300px', width: '300px' }}
                        />
                    </div>
                </div>

                <div className='mat-8'></div>

                <div className="row">
                    <div className="container-with-border col-md-6" >
                        <div className="textarea-container d-flex align-items-center">
                            <h5 className="mr-2">justifyContent:</h5>
                            <input
                                className="form-control"
                                placeholder="start, end, center"
                                value={justifyContentValue}
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                            <button className="btn btn-secondary" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </div>
                    <div className={`col-md-6 ${isCorrect ? 'correct' : ''}`}>
                        <div className="container-with-border col-md-6"  >
                            <div className='container-with-white-border'>
                                {/* <FontAwesomeIcon
                                    icon={faBug}
                                    size='3x'
                                    style={{
                                        color: justifyContentValue === 'start' || justifyContentValue === 'flex-start' ? 'red' : 'black'
                                      }}
                                      
                                /> */}
                            </div>
                            <div
                                className='container-with-circle-border'
                                style={{
                                    display: 'flex',
                                    justifyContent: emptyChecker ? 'end' : justifyContentValue,
                                }}
                            >
                                {justifyContentValue !== 'start' && justifyContentValue !== 'flex-start' && (
                                    <span> Bug</span>
                                    // <FontAwesomeIcon icon={faFrog} size="4x" className="frog-icon" />
                                )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
};

export default FlexboxGame;