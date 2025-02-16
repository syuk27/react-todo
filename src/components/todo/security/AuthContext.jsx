import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/apiclient";
import { excuteJwtAuthenticationService } from "../api/authentication";

//Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//Put some state in the context

//Share the created context with other components

function AuthProvider({ children }) {
  const [number, setNumber] = useState(0);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [message, setmessage] = useState(undefined);

  const [token, setToken] = useState(null);

  //   const [username, setUsername] = useState("");

  //   function login(username, password) {
  //     if (username === "syuk27" && password === "1234") {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       return true;
  //     } else {
  //       setAuthenticated(false);
  //       setUsername(null);
  //       return false;
  //     }
  //   }

  // async function useBasiclogin(username, password) {
  //   //window.btoa => Base64 인코딩
  //   const baToken = "Basic " + window.btoa(username + ":" + password);

  //   try {
  //     const response = await excuteBasicAuthenticationService(baToken);

  //     if (response.status == 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);

  //       apiClient.interceptors.request.use(
  //           (config) => {
  //               config.headers.Authorization = baToken;
  //               return config;
  //           }
  //       )

  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     logout();
  //     return false;
  //   }
  // }
  
  /** JWT */
  async function login(username, password) {
    try {
      const response = await excuteJwtAuthenticationService(username, password);
      if (response.status == 200) {
        const jwtToken = 'Bearer ' + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use(
            (config) => {
                config.headers.Authorization = jwtToken;
                return config;
            }
        )

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.log("error", error);
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username,
        setUsername,
        message,
        setmessage,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
