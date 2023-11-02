"use client"
const { createContext, useState, useEffect } = require("react");

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {

    const authStateString = localStorage.getItem("authState");
    const authStateJSON = (authStateString == null) ? {
        USER_MODE: "",
    } : JSON.parse(authStateString);
    const [authState, setAuthState] = useState(
        authStateJSON
    );

    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(authState))
    }, [authState])

    return <SessionContext.Provider value={{ authState, setAuthState }}>
        {children}
    </SessionContext.Provider>
}

export default SessionContextProvider;