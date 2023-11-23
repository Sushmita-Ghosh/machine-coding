/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ProgressBar = ({ value }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    // the number must lie between zero and hundred
    // so we can use Math.min and Math.max
    // Math.max will handle for negative values
    // Math.min will handle for values greater than 100
    setPercent(Math.min(100, Math.max(value, 0)));
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()} %
      </span>
      <div style={{ width: `${percent}%` }} /> {/* This is for the fill */}
    </div>
  );
};

// ProgressBar.propTypes = {
//   value: PropTypes.string,
// };

export default ProgressBar;

// If we are not providing default value to the props we get an error.
