import "./App.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          width: `${progress}%`,
          color: progress < 5 ? "black" : "white", // to have condition formtting inside box
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  );
};

const App = () => {
  const progressBarTest = [0, 5, 50, 75, 100];
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
