import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutThunk } from "../../redux/store";
import "./NavBar.css";

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLogged, isGuest } = user;
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutThunk);
  };
  return (
    <nav id="navbar">
      <Link to="/">Ana səhifə</Link>
      <Link to="/search/">Ətraflı axtarış</Link>
      <Link to="/about">Haqqında</Link>
      {isLogged && (
        <Link to="/logout" onClick={logoutHandler}>
          Log out
        </Link>
      )}
      {isGuest && <Link to="/login">Daxil ol</Link>}
      {isGuest && <Link to="/registration">Qeydiyyat</Link>}
    </nav>
  );
}
