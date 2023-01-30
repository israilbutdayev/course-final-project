import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginThunk } from "../../redux/store";

export default function LoginPage() {
  const { isLogged } = useSelector((state) => state.credentials);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const loginHandler = (e) => {
    e.preventDefault();
    let cancel = false;
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    ["email", "password"].forEach((prop) => {
      if (jsonData[prop]) {
        document.querySelector(
          `form#login > div#${prop} > span#warning`
        ).style.display = "none";
      } else {
        document.querySelector(
          `form#login > div#${prop} > span#warning`
        ).style.display = "inline";
        cancel = true;
      }
    });
    if (!cancel) {
      dispatch(loginThunk(jsonData));
    }
  };
  if (isLogged) {
    navigate("/", { replace: true });
  }
  return (
    <form action="POST" id="login" ref={formRef}>
      <div id="email">
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="emailinizi daxil edin."
        />
        <span id="warning">Zəhmət olmasa emailinizi daxil edin.</span>
      </div>
      <div id="password">
        <label htmlFor="password">Şifrə:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="şifrənizi daxil edin."
        />
        <span id="warning">Zəhmət olmasa şifrənizi daxil edin.</span>
      </div>
      <br />
      <button type="submit" onClick={loginHandler}>
        Daxil ol
      </button>
    </form>
  );
}
