import { useEffect, useRef, useState } from "react";
import "./App.css";

/**
 * Steps: Build a generic array input for the digit & make it controlled
 * 2. Should only accept numbers
 * 3. No spaces in the input
 * 4. If we are typing more digits into the input then it should take the last input
 * 5. On entering one digit focus should shift to next ele.
 * 6. On reload, shift focus to first input
 * 7. On backspace, the focus should move to prev input after deletion
 */

const OTP_DIGITS_INPUT = 6;

const App = () => {
  const [otpInputArr, setOtpInputArr] = useState(
    Array(OTP_DIGITS_INPUT).fill("")
  );

  /** STEP 5: We need an array here; as we need to store the ref of eah input : here 6*/
  const otpInputRefArr = useRef([]);

  /** STEP 6:  */
  useEffect(() => {
    otpInputRefArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    /**Only numbers */
    if (isNaN(value) && value !== " ") return;

    /** STEP 3: This is important as we are not supposed to have spaces after numbers */
    const newValue = value.trim();
    const newArr = [...otpInputArr];
    /** STEP 4: Use slice to take only the last entered digits */
    newArr[index] = newValue.slice(-1);
    setOtpInputArr(newArr);

    /**STEP 5: Move focus to next input  only if present */
    /** Here newValue && is needed - as the focus should only shift if the value is present */
    newValue && otpInputRefArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    // if (e.key === " ") {
    //   e.preventDefault();
    // // }
    // console.log(e.key, index);
    /** Why the check !e.target.value is needed ?? As the default behavior of the backspace is to delete the focused input
     * Here focus shifts first , then deletion happens
     * We need to ensure that the order is correct - so the focus will only shift if the current input is empty
     */
    if (!e.target.value && e.key === "Backspace") {
      otpInputRefArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="app">
      <h1 className="header">OTP Input</h1>

      <div className="otp-input-container">
        {otpInputArr.map((input, index) => {
          return (
            <input
              type="text"
              key={index}
              className="input-box"
              value={input}
              /** we are using ref callbacks here? you have multiple inputs, so you can’t use just one ref. You need one ref per input.
               * Below fn means - When this input mounts, give me the DOM node, and I’ll decide what to do with it.
               */
              ref={(inputNode) => {
                if (inputNode) {
                  otpInputRefArr.current[index] = inputNode;
                }
              }}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
