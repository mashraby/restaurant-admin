import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";

const Private = () => {
  const token = window.localStorage.getItem("acces_token");

  if (!token) {
    return <Login />;
  } else {
    return <Outlet />;
  }
};

export default Private;
