import "./App.css";
import TrafficLight from "./TrafficLight";
const App = () => {
  const trafficLightStates = {
    red: {
      backgroundColor: "red",
      duration: 4000,
      next: "green",
    },

    yellow: {
      backgroundColor: "yellow",
      duration: 500,
      next: "red",
    },
    green: {
      backgroundColor: "green",
      duration: 3000,
      next: "yellow",
    },
  };
  return (
    <div>
      <h1>Traffic Lights</h1>
      <div className="wrapper">
        <TrafficLight trafficStates={trafficLightStates} />
      </div>
    </div>
  );
};

export default App;
