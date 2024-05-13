import React from 'react';

function ProgressBar({ currentIndex, totalImages }) {
  const progress = ((currentIndex + 1) / totalImages) * 100;


  const progressBarStyle = {
    width: `${progress}%`,
    background: ` linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(72,69,252,1) 100%)`,
    color : `white`,

    fontWeight: "bolder"

  };

  const centerTextStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%', 
    width : '100rem'
  };

  return (
    <div className="progress-bar">
      <div className="progress" style={progressBarStyle}>
        <div style={centerTextStyle}>{progress.toFixed(0)} %</div>
      </div>
    </div> );
}

export default ProgressBar;