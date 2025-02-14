import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./TodoApp.css";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthPovider from "./security/AuthContext";
import { useState } from "react";

export default function TodoApp() {
  const [username, setUsername] = useState("");

  return (
    <div className="TodoApp">
      <AuthPovider>
        <BrowserRouter>
          <HeaderComponent username={username}/>
          <Routes>
            <Route path="/" element={<LoginComponent username={username} setUsername={setUsername} />} />
            <Route path="/welcome/:username" element={<WelcomeComponent />} />
            <Route path="/todos" element={<ListTodosComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />

            <Route path="/*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthPovider>
    </div>
  );
}
