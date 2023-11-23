/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MAX, MIN } from "../../constants";

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    // the number must lie between zero and hundred
    // so we can use Math.min and Math.max
    // Math.max will handle for negative values
    // Math.min will handle for values greater than 100
    setPercent(Math.min(MAX, Math.max(value, MIN)));
    if (value >= MAX) {
      onComplete();
    }
  }, [value, onComplete]);
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()} %
      </span>
      <div
        // style={{ width: `${percent}%` }} // this is not good for performance
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent.toFixed()}
      />
      {/* This is for the fill */}
    </div>
  );
};

// ProgressBar.propTypes = {
//   value: PropTypes.string,
// };

export default ProgressBar;

// If we are not providing default value to the props we get an error.
