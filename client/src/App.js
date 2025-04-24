import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import FinanceTracker from "./components/FinaceTracker/FinanceTracker";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useDispatch } from 'react-redux';
import { refreshAccessToken } from "./store/authSlice";
import SummaryDashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<FinanceTracker />} />
          <Route path="/dashboard" element={<SummaryDashboard/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
