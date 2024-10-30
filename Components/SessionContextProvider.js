"use client"
import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ USER_MODE: '' });

  useEffect(() => {
    // Check localStorage and cookies on mount
    const storedUserMode = localStorage.getItem('userMode');
    const cookies = document.cookie.split('; ');
    let cookieUserMode = null;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'USER_MODE') {
        cookieUserMode = value.trim();
      }
    });

    // Use cookie value if available, otherwise use localStorage
    const userMode = cookieUserMode || storedUserMode || '';
    
    setAuthState({ USER_MODE: userMode });
  }, []);

  // Update localStorage when authState changes
  useEffect(() => {
    if (authState.USER_MODE) {
      localStorage.setItem('userMode', authState.USER_MODE);
    } else {
      localStorage.removeItem('userMode');
    }
  }, [authState]);

  return (
    <SessionContext.Provider value={{ authState, setAuthState }}>
      {children}
    </SessionContext.Provider>
  );
};
