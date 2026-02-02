import { useEffect, useRef, useState } from "react";
import "./App.css";

/**
 * OTP Input Component
 *
 * Improvements:
 * 1. Accessibility: Added aria-label and role for screen readers
 * 2. Performance: Avoid creating new inline functions on every render
 * 3. Keyboard UX: Added support for arrow keys for navigation
 * 4. Input Validation: Explicitly prevent non-digit characters
 * 5. Maintainability: Cleaned up comments and made logic clearer
 */

const OTP_DIGITS_INPUT = 6;

const App = () => {
  const [otpInputArr, setOtpInputArr] = useState(
    Array(OTP_DIGITS_INPUT).fill("")
  );

  // Use a ref array to store all input DOM nodes for focus management
  const otpInputRefArr = useRef([]);

  // On component mount, focus the first input
  useEffect(() => {
    otpInputRefArr.current[0]?.focus();
  }, []);

  // Handle input changes
  //   const handleOnChange = (value, index) => {
  //     // Only allow digits
  //     const sanitizedValue = value.replace(/\D/g, ""); // remove non-digit characters
  //     if (!sanitizedValue) return; // do nothing if empty/non-digit

  //     const newArr = [...otpInputArr];
  //     // Take only the last entered digit (important for pasting multiple digits)
  //     newArr[index] = sanitizedValue.slice(-1);
  //     setOtpInputArr(newArr);

  //     // Focus next input if it exists
  //     if (index < OTP_DIGITS_INPUT - 1) {
  //       otpInputRefArr.current[index + 1]?.focus();
  //     }
  //   };

  const handleOnChange = (value, index) => {
    const newArr = [...otpInputArr];

    if (value === "") {
      // Allow empty input for deletion
      newArr[index] = "";
      setOtpInputArr(newArr);
      return;
    }

    // Only keep digits if input is not empty
    const sanitizedValue = value.replace(/\D/g, "");
    if (!sanitizedValue) return; // ignore non-digit input

    // Take only the last digit typed
    newArr[index] = sanitizedValue.slice(-1);
    setOtpInputArr(newArr);

    // Move focus to next input
    if (index < OTP_DIGITS_INPUT - 1) {
      otpInputRefArr.current[index + 1]?.focus();
    }
  };

  //   // Handle key events
  //   const handleOnKeyDown = (e, index) => {
  //     const key = e.key;
  //     console.log(key);

  //     // Backspace behavior: move focus to previous input if current is empty
  //     if (key === "Backspace" && !otpInputArr[index] && index > 0) {
  //       e.preventDefault();
  //       otpInputRefArr.current[index - 1]?.focus();
  //     }

  //     // Arrow key navigation for better UX
  //     if (key === "ArrowLeft" && index > 0) {
  //       otpInputRefArr.current[index - 1]?.focus();
  //     }
  //     if (key === "ArrowRight" && index < OTP_DIGITS_INPUT - 1) {
  //       otpInputRefArr.current[index + 1]?.focus();
  //     }
  //   };
  const handleOnKeyDown = (e, index) => {
    const key = e.key;

    // Backspace behavior
    if (key === "Backspace" && !otpInputArr[index] && index > 0) {
      otpInputRefArr.current[index - 1]?.focus();
    }

    // Arrow key navigation
    if (key === "ArrowLeft" && index > 0) {
      e.preventDefault(); // prevent default cursor movement
      otpInputRefArr.current[index - 1]?.focus();
    }
    if (key === "ArrowRight" && index < OTP_DIGITS_INPUT - 1) {
      e.preventDefault(); // prevent default cursor movement
      otpInputRefArr.current[index + 1]?.focus();
    }
  };
  // Render OTP input boxes
  return (
    <div className="app">
      <h1 className="header">OTP Input</h1>

      <div className="otp-input-container" role="group" aria-label="OTP Input">
        {otpInputArr.map((input, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric" // Mobile keyboard shows numbers
            pattern="\d*" // Prevent non-digits in some browsers
            maxLength={1} // Ensure only 1 character can be typed
            className="input-box"
            value={input}
            // Ref callback to store input DOM nodes
            ref={(inputNode) => {
              if (inputNode) otpInputRefArr.current[index] = inputNode;
            }}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`} // Accessibility
            autoComplete="one-time-code" // Mobile OTP autofill
          />
        ))}
      </div>
    </div>
  );
};

export default App;
