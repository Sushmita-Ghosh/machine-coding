// Requirement-2 Global Solution - Creating Context

import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  // it is not a good practice to export the setToggle function/setter
  // so we create a functn
  const toggleTheme = () => {
    setToggle(!toggle);
  };

  // Functionality - 3 - only once --> []
  useEffect(() => {
    const timer = setTimeout(() => {
      setToggle(!toggle);
    }, 5000);

    // cleanup function - Imp
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ThemeContext.Provider value={{ toggle, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// STEPS:
// 1. create a context createcontext
// 2. create a provider context.Provider
// 3. wrap your app in the provider <Provider></Provider>
// 4. use the context in your app where you need & pass in your context useContext
