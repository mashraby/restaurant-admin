import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sideBar">
      <h1 className="text-light p-5">Admin Panel</h1>
      <ul className="d-flex flex-column gap-3">
        <li className="w-100">
          <NavLink className="sideBar-link" to={`/`}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className="sideBar-link" to={`/restaurants`}>
            Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink className="sideBar-link" to={`/foods`}>
            Foods
          </NavLink>
        </li>
        <li>
          <NavLink className="sideBar-link" to={`/orders`}>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
