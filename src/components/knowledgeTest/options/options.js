import React from 'react'

function Options() {
  return (
    <div className="options">
      <h3>Select an option:</h3>
      <label>
        <input type="radio" name="option" value="Option 1" /> Option 1
      </label>
      <label>
        <input type="radio" name="option" value="Option 2" /> Option 2
      </label>
      <label>
        <input type="radio" name="option" value="Option 3" /> Option 3
      </label>
      <label>
        <input type="radio" name="option" value="Option 4" /> Option 4
      </label>
    </div>
  )
}

export default Options