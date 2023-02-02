import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registrationSlice, registrationThunk } from "../../redux/store";
import "./RegistrationPage.css";
import { useEffect } from "react";

function RegistrationPage() {
  const { isLogged } = useSelector((state) => state.credentials);
  const { firstName, lastName, email, password } = useSelector(
    (state) => state.registration
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate]);
  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(registrationSlice.actions.set({ [prop]: e.target.value }));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registrationThunk);
  };

  return (
    <form action="POST" id="registration">
      <div id="firstName">
        <label htmlFor="firstName">Ad:</label>
        <br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="Adınızı daxil edin."
          value={firstName}
          onChange={changeHandler}
        />
        {!firstName.length && (
          <span id="warning">Zəhmət olmasa adınızı daxil edin.</span>
        )}
      </div>
      <div id="lastName">
        <label htmlFor="lastName">Soyad:</label>
        <br />
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          placeholder="Soyadınızı daxil edin."
          value={lastName}
          onChange={changeHandler}
        />
        {!lastName.length && (
          <span id="warning">Zəhmət olmasa soyadınızı daxil edin.</span>
        )}
      </div>
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
          placeholder="şifrənizi daxil edin."
          value={password}
          onChange={changeHandler}
        />
        {!password.length && (
          <span id="warning">Zəhmət olmasa şifrənizi daxil edin.</span>
        )}
      </div>
      <br />
      <button type="submit" onClick={submitHandler}>
        Qeydiyyat
      </button>
    </form>
  );
}

export default RegistrationPage;
