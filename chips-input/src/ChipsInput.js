import React, { useState } from 'react';
import './styles.css'
function ChipsInput() {
  const [searchText, setSearchText] = useState("")
  const [chips, setChips] = useState([])

  const handleKeyDown = (e) => {
    const addText = searchText.trim()
    if (e.key === "Enter" && addText !== "") {
      //logic to add chips
      setChips(prev => [...prev, addText])
      setSearchText("") // after adding make it empty
    }

    //const handleKeyDown = useCallback((e) => { ... }, [searchText, chips])



    /** If we don't want duplicates */
    // if (e.key === "Enter" && addText !== "" && !chips.includes(addText)) {
    //   setChips(prev => [...prev, addText])
    //   setSearchText("")
    // }
  }


/** Better way of writing */
  // const handleDeleteChip = (index) => {
  //   setChips(prev => prev.filter((_, i) => i !== index))
  // }

  const handleDeleteChip = (index) => {
    const newChips = chips.filter((chip, i) => i !== index)
    setChips(newChips)
  }


  return (
    <div className='main-container'>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        className="input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <div className="chips-container">

        {chips.map((chip, index) => (
          <div className="chip" key={`${chip}-${index}`}>
            <p>{chip}</p>
            <button
              className="btn"
              aria-label={`delete ${chip}`} // add aria lable
              onClick={() => handleDeleteChip(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;