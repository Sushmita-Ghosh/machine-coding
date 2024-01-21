/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  // to focus on the first input directly instead of user clicking
  const inputRefs = useRef([]);

  useEffect(() => {
    // focus on the first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  });

  const handleChange = (index, event) => {
    const value = event.target.value;

    if (isNaN(value)) {
      return;
    }

    // allow only one input
    const newOtp = [...otp];

    // we are taking only last character of the input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    //   Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    // cursor focus on the end
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional validation, if any blanks in the middle
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    // automatic focus on prev element if backspace is pressed
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // move focus to the prev input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-input"
            ref={(el) => (inputRefs.current[index] = el)}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
