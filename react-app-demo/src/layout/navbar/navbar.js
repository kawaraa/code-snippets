import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && (
        <nav className="navbar" onClick={() => setShow(false)}>
          <NavLink to="/" className="nav-link">
            Tic Tac Toe
          </NavLink>
          <NavLink to="/todos" className="nav-link">
            Todos
          </NavLink>
        </nav>
      )}
      <button onClick={() => setShow(!show)} className={"nav-btn nf " + (show && "x")}>
        <div className="nav-btn-bar1"></div>
        <div className="nav-btn-bar2"></div>
        <div className="nav-btn-bar3"></div>
      </button>
    </div>
  );
}

export default Navbar;
