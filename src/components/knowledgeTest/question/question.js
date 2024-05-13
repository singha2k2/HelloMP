import React from 'react'

function Question() {
  return (
    <div className="question">
      <h2>What is the capital of France?</h2>
      <ul>
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
      </ul>
    </div>
  )
}

export default Question