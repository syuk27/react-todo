import { createContext, useContext, useState } from "react";

//Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//Put some state in the context

//Share the created context with other components

function AuthPovider({ children }) {

    const [number, setNumber] = useState(0);

    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={ {number, isAuthenticated, setAuthenticated} }>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthPovider;