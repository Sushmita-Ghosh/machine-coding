import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // country: "United States",
    /** country should be selection */
    country: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    interests: {
      coding: false,
      music: false,
      sports: false,
      travel: false,
      reading: false,
      gaming: false,
    },
    /** related to settings */
    newsletter: false,
    notifications: false,
    personalizedAds: false,
  });
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interests",
      component: Interests,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];

  const ActiveComponent = tabs[activeTab].component;

  const handleSubmitChange = () => {
    console.log("Form Data Submitted: ", formData);
    alert("Form Submitted! Check console for data.");
  };

  return (
    <div>
      <div className="tab-container">
        {tabs.map((t, index) => (
          <button
            key={index}
            className="tabs"
            onClick={() => setActiveTab(index)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <ActiveComponent formData={formData} setFormData={setFormData} />

      {/* Rendering the prev, next & submit buttons  */}

      <div className="navigation-buttons">
        {activeTab > 0 && (
          <button className="tabs" onClick={() => setActiveTab(activeTab - 1)}>
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button className="tabs" onClick={() => setActiveTab(activeTab + 1)}>
            Next
          </button>
        )}
        {activeTab === tabs.length - 1 && (
          <button className="tabs" onClick={handleSubmitChange}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
