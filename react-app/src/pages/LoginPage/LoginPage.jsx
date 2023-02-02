import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginThunk } from "../../redux/store";
import { useEffect } from "react";
import { loginSlice } from "../../redux/store";
import "./LoginPage.css";

export default function LoginPage() {
  const { isLogged } = useSelector((state) => state.credentials);
  const { email, password } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(loginSlice.actions.set({ [prop]: e.target.value }));
  }
  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate]);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk);
  };

  return (
    <form action="POST" id="login">
      <div id="email">
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="emailinizi daxil edin."
          value={email}
          onChange={changeHandler}
        />
        {!email.length && (
          <span id="warning">Zəhmət olmasa emailinizi daxil edin.</span>
        )}
      </div>
      <div id="password">
        <label htmlFor="password">Şifrə:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={changeHandler}
          placeholder="şifrənizi daxil edin."
        />
        {!password.length && (
          <span id="warning">Zəhmət olmasa şifrənizi daxil edin.</span>
        )}
      </div>
      <br />
      <button type="submit" onClick={loginHandler}>
        Daxil ol
      </button>
    </form>
  );
}
