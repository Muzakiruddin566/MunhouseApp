import React from "react";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
