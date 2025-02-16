import PropTypes from "prop-types";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import "./TodoApp.css";
import TodoComponent from "./TodoComponent";
import WelcomeComponent from "./WelcomeComponent";

function AuthenticatedRoute({ children }) {
  console.log("children", children);
  const authContext = useAuth();
  if (authContext.isAuthenticated) return <Outlet />;
  // Outlet => 부모 <Route> 안에서 하위 <Route>를 렌더링하는 위치를 지정하는 컴포넌트
  // React Router v6에서는 children이 자동으로 전달되지 않음

  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route
              path="/"
              element={
                <LoginComponent />
              }
            />
            <Route element={<AuthenticatedRoute />}>
              <Route path="/welcome/:username" element={<WelcomeComponent />} />
              <Route path="/todos" element={<ListTodosComponent />} />
              <Route path="/todo/:id" element={<TodoComponent />} />
              <Route path="/logout" element={<LogoutComponent />} />
            </Route>
            <Route path="/*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

AuthenticatedRoute.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
  // this will add a min-height of 660px on small screens
  responsive: PropTypes.bool,
};
