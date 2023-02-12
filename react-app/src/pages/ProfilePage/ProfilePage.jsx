import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSlice, useUpdateMutation, profileSlice } from "../../redux/store";
import { Button, TextInput, Label, Alert } from "flowbite-react";
export default function Profile() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const [triggerUpdate] = useUpdateMutation();
  const user = useSelector((state) => state.user);
  const { firstName, lastName, email } = useSelector((state) => state.profile);
  useEffect(() => {
    const { firstName, lastName, email } = user;
    dispatch(
      profileSlice.actions.set({
        firstName,
        lastName,
        email,
        password,
        newPassword,
      })
    );
  }, [dispatch, user, password, newPassword]);
  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(profileSlice.actions.apply({ [prop]: e.target.value }));
  }
  const updateHandler = async (e) => {
    e.preventDefault();
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
      setAlertMessage("Məlumatlar uğurla yeniləndi.");
      setAlertColor("info");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setPassword("");
      setNewPassword("");
    } else {
      setAlertColor("failure");
      setAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  return (
    <React.Fragment>
      {showAlert && (
        <Alert color={alertColor} className="mx-4">
          <span className="font-medium">{alertMessage}</span>
        </Alert>
      )}
      <form className="flex flex-col gap-4 mx-10 my-6">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="Adınızı daxil edin." />
          </div>
          <TextInput
            id="firstName"
            type="text"
            required={true}
            shadow={true}
            value={firstName}
            onChange={changeHandler}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Soyadınızı daxil edin." />
          </div>
          <TextInput
            id="lastName"
            type="text"
            required={true}
            shadow={true}
            onChange={changeHandler}
            value={lastName}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Emailinizi daxil edin." />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            required={true}
            shadow={true}
            onChange={changeHandler}
            value={email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Şifrənizi daxil edin." />
          </div>
          <TextInput
            id="password"
            type="password"
            required={true}
            shadow={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="newPassword" value="Şifrənizi daxil edin." />
          </div>
          <TextInput
            id="newPassword"
            type="password"
            required={true}
            shadow={true}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <Button type="submit" onClick={updateHandler}>
          Yadda Saxla
        </Button>
      </form>
    </React.Fragment>

    // <div>
    //   <label htmlFor="firstName">Ad: </label>
    //   <input
    //     id="firstName"
    //     value={firstName}
    //     onChange={(e) => {
    //       setFirstName(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <label htmlFor="lastName">Soyad: </label>
    //   <input
    //     id="lastName"
    //     value={lastName}
    //     onChange={(e) => {
    //       setLastName(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <label htmlFor="email">Email: </label>
    //   <input
    //     id="email"
    //     value={email}
    //     onChange={(e) => {
    //       setEmail(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <label htmlFor="password">Cari şifrə: </label>
    //   <input
    //     id="password"
    //     value={password}
    //     onChange={(e) => {
    //       setPassword(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <label htmlFor="email">Yeni Şifrə: </label>
    //   <input
    //     id="newPassword"
    //     value={newPassword}
    //     onChange={(e) => {
    //       setNewPassword(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <br />
    //   <button onClick={updateHandler}>Yenilə</button>
    // </div>
  );
}
