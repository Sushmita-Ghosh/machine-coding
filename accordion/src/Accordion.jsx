import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Accordion({ items }) {
  const [isMultiple, setIsMultiple] = useState(false);
  //   const [activeIndex, setActiveIndex] = useState(null); => for single one
  const [activeIndex, setActiveIndex] = useState([]);

  //   const handleToggle = (index) => {
  //     setActiveIndex((prev) => (prev === index ? null : index));
  //   };

  const handleToggle = (index) => {
    if (isMultiple) {
      setActiveIndex((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // close
          : [...prev, index],
      );
    } else {
      setActiveIndex((prev) => (prev[0] === index ? [] : [index]));
    }
  };

  const handleModeChange = () => {
    setIsMultiple((prev) => {
      if (prev && activeIndex.length > 1) {
        setActiveIndex([]); // making only one open item
      }
      return !prev; // toggle
    });
  };
  return (
    <div className="accordion">
      <div className="ismutiple-container">
        <label>
          <input
            type="checkbox"
            checked={isMultiple}
            onChange={handleModeChange}
          />
          isMultiple
        </label>
      </div>
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <div className="accordion-title">
            {item.title}
            <span
              className="accordion-icon"
              onClick={() => handleToggle(index)}
            >
              {/* {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />} */}
              {activeIndex.includes(index) ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </span>
          </div>
          {/* {activeIndex === index && (
            <div className="accordion-content">{item.content}</div>
          )} */}

          {activeIndex.includes(index) && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
