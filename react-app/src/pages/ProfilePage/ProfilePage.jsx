import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyLogoutQuery,
  userSlice,
  useUpdateMutation,
} from "../../redux/store";
export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerLogout] = useLazyLogoutQuery();
  const [triggerUpdate] = useUpdateMutation();
  const logoutHandler = (e) => {
    e.preventDefault();
    triggerLogout(user.access_token)
      .unwrap()
      .then(() => {
        dispatch(
          userSlice.actions.set({
            isLogged: false,
            email: "",
            firstName: "",
            lastName: "",
            access_token: "",
          })
        );
        navigate("/", { replace: true });
      });
  };
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const updateHandler = async () => {
    const response = await triggerUpdate({
      firstName,
      lastName,
      email,
      password,
      newPassword,
      access_token: user.access_token,
    });
    if (response.data.success) {
      const {
        user: { firstName, lastName, email },
        access_token,
      } = response.data;
      if (access_token) {
        dispatch(
          userSlice.actions.set({
            initialLoad: false,
            isLogged: true,
            firstName,
            lastName,
            email,
            access_token,
          })
        );
      }
    }
  };
  return (
    <div>
      <label htmlFor="firstName">Ad: </label>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="lastName">Soyad: </label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label htmlFor="password">Cari şifrə: </label>
      <input
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <label htmlFor="email">Yeni Şifrə: </label>
      <input
        id="newPassword"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={updateHandler}>Yenilə</button>
      <br />
      <br />
      <button onClick={logoutHandler}>Hesabdan çıxış</button>
    </div>
  );
}
