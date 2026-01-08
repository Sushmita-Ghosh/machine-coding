import { useEffect, useState } from "react";
import "./App.css";

// const ProgressBar = ({ progress }) => {
//   return (
//     <div className="outer">
//       <div
//         className="inner"
//         style={{
//           // transform: `translateX(-20%)`, => progress = 80% then translate should be 80 -100 = -20%
//           transform: `translateX(${
//             progress - 100
//           }%)` /** here we need the inner bar to move distance from right so it should be -ve (100 - (-progress)) */,
//           // width: `${progress}%`, // width always repaints the html each time it's rendered so better way to do this is translate
//           color: progress < 5 ? "black" : "white", // to have condition formtting inside box
//         }}
//         role="progressbar"
//         aria-valuenow={progress}
//         aria-valuemin="0"
//         aria-valuemax="100"
//       >
//         <span className="label">{progress}%</span>
//       </div>
//     </div>
//   );
// };

const ProgressBar = ({ progress }) => {
  /** If someone provides the -ve values for progress bar 0  ≤  progress  ≤  100 - we force it to zero   */
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(clampedProgress);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <div
      className="outer"
      role="progressbar"
      aria-valuenow={animatedProgress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext={`${animatedProgress}% complete`}
    >
      <div
        className="bar"
        style={{
          transform: `translateX(${animatedProgress - 100}%)`,
        }}
      />

      <span className="label">{animatedProgress}%</span>
    </div>
  );
};
const App = () => {
  const progressBarTest = [0, 5, 50, 75, 100, -20, 140];
  return (
    <div className="app-container">
      <h1 className="title">Progress Bar</h1>

      {progressBarTest.map((p) => (
        <div className="progress-bar-container">
          <ProgressBar progress={p} />
        </div>
      ))}
    </div>
  );
};

export default App;
