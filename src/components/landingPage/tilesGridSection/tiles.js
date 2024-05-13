import React from 'react';
import './tiles.css';
import {  Tooltip } from 'react-tooltip'

function Tiles() {
  return (
    <section className='center-container'>
     <div className="tiles-container">
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Explore the world with our global content!">
      <img
        className="tile-image"
        src="./images/icon-1.png"
        alt="avatar1"
      />
      <button className='tile-button'>Global Content</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Discover customized learning experiences.">
      <img
        className="tile-image"
        src="./images/icon-2.png"
        alt="avatar2"
      />
      <button className='tile-button'>Customized Learning</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Access personalized tools for your needs.">
      <img
        className="tile-image"
        src="./images/icon-3.png"
        alt="avatar3"
      />
      <button className='tile-button'>Personalized Tools</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Experience cutting-edge advancements in technology.">
      <img
        className="tile-image"
        src="./images/icon-4.png"
        alt="avatar4"
      />
      <button className='tile-button'>Advance Technology</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Stay updated with the latest contextual information.">
      <img
        className="tile-image"
        src="./images/icon-5.png"
        alt="avatar5"
      />
      <button className='tile-button'>Latest Context</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
  <div className="tile-item1">
    <div className="tile-content" data-tooltip-id="my-tooltip" data-tooltip-content="Manage your learning schedule efficiently.">
      <img
        className="tile-image"
        src="./images/icon-6.png"
        alt="avatar6"
      />
      <button className='tile-button'>Schedule Learning</button>
    </div>
  </div>
  <Tooltip id="my-tooltip" />
</div>
</section>

  );
}

export default Tiles;
