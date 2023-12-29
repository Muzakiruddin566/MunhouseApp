import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import PropertyDetails from "./views/PropertyDetails";
import HouseOwnerPostHouse from "./views/HouseOwnerPostHouse";
import HouseOwnerDashboard from "./views/HouseOwnerDashboard";
import PropertyDescription from "./views/buyer/PropertyDescription";
import PrivateRoute from "./helpers/PrivateRoute";
import ProtectedRoute from "./helpers/ProtectedRoute"
import EditUserProfile from "./views/Pages/UserProfile";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element = {<PrivateRoute  element={<EditUserProfile />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/seller"
            element={<ProtectedRoute element={<HouseOwnerDashboard />} />}
          />
          <Route path="/postproperty" element = {<ProtectedRoute element={<HouseOwnerPostHouse />} />} />
          <Route path="/postproperty/:id" element = {<ProtectedRoute element={<HouseOwnerPostHouse />} />} />
          <Route path="/buyerpostproperty" element={<PropertyDescription />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
