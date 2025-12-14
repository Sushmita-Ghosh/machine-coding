import { useEffect, useState } from "react";

const TrafficLight = ({ trafficStates }) => {
  const [currentColor, setCurrentColor] = useState("green");

  //   useEffect(() => {
  //     const { duration } = trafficStates[currentColor];
  //     let myInterval = setInterval(() => {
  //       setCurrentColor((prev) => trafficStates[prev].next);
  //     }, duration);

  //     return () => {
  //       clearInterval(myInterval);
  //     };
  //   }, [currentColor]);

  /**
   * WHY NOT setInterval?
   * Each light has a different duration, so I want to schedule the next transition dynamically based on the current state. setTimeout avoids overlapping intervals and models the state machine more clearly.
   */

  useEffect(() => {
    const { duration } = trafficStates[currentColor];

    const timeout = setTimeout(() => {
      setCurrentColor(trafficStates[currentColor].next);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentColor, trafficStates]);

  return (
    <div className="traffic-light-container">
      {Object.keys(trafficStates).map((color) => {
        return (
          <div
            className="traffic-light"
            style={{
              backgroundColor:
                color === currentColor && trafficStates[color].backgroundColor,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default TrafficLight;
