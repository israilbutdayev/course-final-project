import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registrationThunk } from "../../redux/store";
import "./RegistrationPage.css";

function RegistrationPage() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());

    dispatch(registrationThunk(jsonData));
  };
  return (
    <form action="POST" id="registration" ref={formRef}>
      <div id="firstName">
        <label htmlFor="firstName">Ad:</label>
        <input type="text" name="firstName" id="firstName" required />
      </div>
      <div id="lastName">
        <label htmlFor="lastName">Soyad:</label>
        <input type="text" name="lastName" id="lastName" required />
      </div>
      <div id="email">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div id="password">
        <label htmlFor="password">Şifrə:</label>
        <input type="password" name="password" id="password" required />
      </div>
      <button type="submit" onClick={submitHandler}>
        Qeydiyyat
      </button>
    </form>
  );
}

export default RegistrationPage;
