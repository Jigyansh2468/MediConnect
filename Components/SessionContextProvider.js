"use client"
import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ USER_MODE: '' });

  useEffect(() => {
    // Access localStorage only on the client side
    const authStateString = localStorage.getItem('authState');
    const authStateJSON = authStateString ? JSON.parse(authStateString) : { USER_MODE: '' };
    setAuthState(authStateJSON);
  }, []);

  useEffect(() => {
    // Update localStorage when authState changes
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <SessionContext.Provider value={{ authState, setAuthState }}>
      {children}
    </SessionContext.Provider>
  );
};
