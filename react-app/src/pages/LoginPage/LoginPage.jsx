import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice, registrationSlice, userSlice } from "../../redux/store";
import { useLoginMutation } from "../../redux/store";
import "./LoginPage.css";

export default function LoginPage() {
  const { email, password } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginQuery] = useLoginMutation();

  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(loginSlice.actions.apply({ [prop]: e.target.value }));
  }
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await loginQuery({ email, password });
    const { success } = response.data;
    if (success) {
      const {
        access_token,
        user: { firstName, lastName },
      } = response.data;
      dispatch(
        userSlice.actions.set({
          initialLoad: false,
          isLogged: true,
          email,
          firstName,
          lastName,
          access_token,
        })
      );
      dispatch(loginSlice.actions.reset());
      dispatch(registrationSlice.actions.reset());
      navigate("/", { replace: true });
    }
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
