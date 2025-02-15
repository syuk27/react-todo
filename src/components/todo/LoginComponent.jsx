import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent({ username, setUsername }) {
  const [password, setPassword] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function usernameHandler() {
    setUsername(event.target.value);
  }

  function passwordHandler() {
    setPassword(event.target.value);
  }

  function submitHandler() {
    if (authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      {showErrorMessage && (
        <div className="errorMessage">
          Authenticated Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="Password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={submitHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
