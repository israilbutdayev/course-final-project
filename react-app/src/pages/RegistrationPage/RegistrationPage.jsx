import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registrationThunk } from "../../redux/store";
import "./RegistrationPage.css";

function RegistrationPage() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    let cancel = false;
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    ["firstName", "lastName", "email", "password"].forEach((prop) => {
      if (jsonData[prop]) {
        document.querySelector(
          `form#registration > div#${prop} > span#warning`
        ).style.display = "none";
      } else {
        document.querySelector(
          `form#registration > div#${prop} > span#warning`
        ).style.display = "inline";
        cancel = true;
      }
    });
    if (!cancel) {
      dispatch(registrationThunk(jsonData));
    }
  };
  return (
    <form action="POST" id="registration" ref={formRef}>
      <div id="firstName">
        <label htmlFor="firstName">Ad:</label>
        <br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="Adınızı daxil edin."
        />
        <span id="warning">Zəhmət olmasa adınızı daxil edin.</span>
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
        />
        <span id="warning">Zəhmət olmasa soyadınızı daxil edin.</span>
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
      <button type="submit" onClick={submitHandler}>
        Qeydiyyat
      </button>
    </form>
  );
}

export default RegistrationPage;
