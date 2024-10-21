"use client"
// const { createContext, useState, useEffect } = require("react");

// export const SessionContext = createContext();

// const SessionContextProvider = ({ children }) => {

//     const authStateString = localStorage.getItem("authState");
//     const authStateJSON = (authStateString == null) ? {
//         USER_MODE: "",
//     } : JSON.parse(authStateString);
//     const [authState, setAuthState] = useState(
//         authStateJSON
//     );

//     useEffect(() => {
//         localStorage.setItem("authState", JSON.stringify(authState))
//     }, [authState])

//     return <SessionContext.Provider value={{ authState, setAuthState }}>
//         {children}
//     </SessionContext.Provider>
// }

// export default SessionContextProvider;


import { createContext, useState, useEffect } from 'react';
// import { useClient } from 'next/app'; // Import useClient for Next.js

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
//   useClient(); // Enable client-side functionality in Next.js

  const authStateString = localStorage.getItem('authState');
  const authStateJSON = authStateString ? JSON.parse(authStateString) : { USER_MODE: '' };
  const [authState, setAuthState] = useState(authStateJSON);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <SessionContext.Provider value={{ authState, setAuthState }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;