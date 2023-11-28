import React from "react";
import { Route } from "react-router-dom";
import { Routes, Navigate } from "react-router";
import Home from "./Home";
import UserPreferences from "./UserPreferences";

class Main extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/user" element={<UserPreferences/>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
  }
}

export default Main;