import { createContext, useContext, useState } from "react";

//Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//Put some state in the context

//Share the created context with other components

function AuthPovider({ children }) {
  const [number, setNumber] = useState(0);

  const [isAuthenticated, setAuthenticated] = useState(false);

//   const [username, setUsername] = useState("");

  function login(username, password) {
    if (username === "syuk27" && password === "1234") {
      setAuthenticated(true);
      return true;
    } else {
      setAuthenticated(false);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthPovider;
