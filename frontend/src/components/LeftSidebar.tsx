import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function LeftSidebar() {
  const location = useLocation();

  return (
    <div className="drawer-side z-30">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-80 bg-base-200 min-h-full text-base-content">
        <li className="mb-2 font-semibold text-xl"></li>
      </ul>
    </div>
  );
}
