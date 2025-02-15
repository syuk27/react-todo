import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./TodoApp.css";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthPovider, { useAuth } from "./security/AuthContext";
import { useState } from "react";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

export default function TodoApp() {
  const [username, setUsername] = useState("");

  return (
    <div className="TodoApp">
      <AuthPovider>
        <BrowserRouter>
          <HeaderComponent username={username} />
          <Routes>
            <Route
              path="/"
              element={
                <LoginComponent username={username} setUsername={setUsername} />
              }
            />
            <Route element={<AuthenticatedRoute />}>
              <Route path="/welcome/:username" element={<WelcomeComponent />} />
              <Route path="/todos" element={<ListTodosComponent />} />
              <Route path="/logout" element={<LogoutComponent />} />
            </Route>
            <Route path="/*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthPovider>
    </div>
  );
}
