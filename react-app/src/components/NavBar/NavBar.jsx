import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../../redux/store";
import "./NavBar.css";

export default function NavBar() {
  const { isLogged, firstName, lastName } = useSelector(
    (state) => state.credentials
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginThunk({}));
  }, [dispatch]);
  return (
    <nav id="navbar">
      <Link to="/">Ana səhifə</Link>
      <Link to="/search/">Ətraflı axtarış</Link>
      <Link to="/about">Haqqında</Link>
      <Link to="/cart">Kart</Link>
      {!isLogged && <Link to="/login">Daxil ol</Link>}
      {!isLogged && <Link to="/registration">Qeydiyyat</Link>}
      {isLogged && <Link to="/profile">{`${firstName} ${lastName}`}</Link>}
    </nav>
  );
}
