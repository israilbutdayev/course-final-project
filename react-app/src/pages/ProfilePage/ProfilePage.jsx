import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/store";

export default function Profile() {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.credentials);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogged) navigate("/", { replace: true });
  }, [isLogged, navigate]);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutThunk);
  };
  const credentials = useSelector((state) => state.credentials);
  const { firstName, lastName } = credentials;
  return (
    <div>
      <p>{`${firstName} ${lastName}`}</p>
      <button onClick={logoutHandler}>Hesabdan çıxış</button>
    </div>
  );
}
