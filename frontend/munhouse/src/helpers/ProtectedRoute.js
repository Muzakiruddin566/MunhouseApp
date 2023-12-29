import React from "react";
import { isSeller, isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated ?  isSeller() === true ? element : <Navigate to="/" replace={true} /> :  <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
