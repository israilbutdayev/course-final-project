import React from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/store";

export default function LoginPage() {
  const dispatch = useDispatch();
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk);
  };
  return (
    <div>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}
