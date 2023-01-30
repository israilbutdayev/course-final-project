import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/store";

export default function Profile() {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutThunk);
  };
  const credentials = useSelector((state) => state.credentials);
  const { firstName, lastName } = credentials;
  if (!isLogged) navigate("/");
  return (
    <div>
      <p>{`${firstName} ${lastName}`}</p>
      <button to="/logout" onClick={logoutHandler}>
        Hesabdan çıxış
      </button>
    </div>
  );
}
