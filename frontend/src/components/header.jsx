import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={"/register"} className={"nav-link"}>
              Registrarse
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/login"} className={"nav-link"}>
              Iniciar Sesion
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
