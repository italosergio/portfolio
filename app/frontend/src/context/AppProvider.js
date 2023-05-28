import React, { useState, useEffect } from 'react';
import AppContext from './AppContext'

export function AppProvider({ children }) {
  const [navBarListOn, setNavBarListOn] = useState(false)

  useEffect(() => {
    
  }, []);

  const state = {
    navBarListOn,
    setNavBarListOn
  }
  
  return (
    <AppContext.Provider value={state}>{children}</AppContext.Provider>
  );
}

export default AppProvider;