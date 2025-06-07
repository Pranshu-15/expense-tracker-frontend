import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" excat element={<Login />} />
              <Route path="/signUp" excat element={<SignUp />} />
              <Route path="/dashboard" excat element={<Home />} />
              <Route path="/income" excat element={<Income />} />
              <Route path="/expense" excat element={<Expense />} />
            </Routes>
          </Router>
        </div>

        <Toaster
          toastOptions={{
            className: "",
            style: { fontSize: "12px" },
          }}
        />
      </UserProvider>
    </>
  );
};

export default App;

const Root = () => {
  // Check is token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
