import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from "../store/authSlice";

const ProtectedRoute = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken && refreshToken) {
      dispatch(refreshAccessToken());
    }
  }, [accessToken, refreshToken, dispatch]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
