import { useState } from "react";
import "./App.css"


const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [byValue, setByValue] = useState(1);

  const decrement = () => {
    // setCounter(counter-byValue)
    setCounter(prev => prev - byValue)

  }


  const handleChangeOfByValue = (e) => {
    console.log(typeof e.target.value)
    setByValue(Number(e.target.value))
  }

  const reset = () => {
    setCounter(0)
  }

  const increment = () => {
    // setCounter(counter+byValue)
    /** Best to avoid in case of batch updates */
    setCounter(prev => prev + byValue)

  }

return (
  <div className="container">
      <h1>Counter</h1>
      <div id="counter">{counter}</div>
      <div className='input'>
       <label>Increment/Decrement by:</label>
       <input id='inputNumber' type='number' onChange={handleChangeOfByValue} value={byValue}></input>
      </div>
      <div className="buttons">
        <button id="decrease" onClick={decrement}>Decrease</button>
        <button id="reset" onClick={reset}>Reset</button>
        <button id="increase" onClick={increment}>Increase</button>
      </div>
    </div>
)
}


export default Counter 