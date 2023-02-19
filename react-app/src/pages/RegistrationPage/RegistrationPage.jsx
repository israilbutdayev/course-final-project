import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import loginSlice from "../../redux/slices/loginSlice";

import { Label, TextInput, Button, Alert } from "flowbite-react";
import { useEffect } from "react";
import { useRegistrationMutation } from "../../redux/store";
import registrationSlice from "../../redux/slices/registrationSlice";
import userSlice from "../../redux/slices/userSlice";

function RegistrationPage() {
  const { isLogged } = useSelector((state) => state.user);
  const { firstName, lastName, email, password } = useSelector(
    (state) => state.registration
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegistrationMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate]);

  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(registrationSlice.actions.apply({ [prop]: e.target.value }));
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await register({ firstName, lastName, email, password });
    if (response.data.success) {
      const {
        user: { firstName, lastName, email },
        access_token,
      } = response.data;
      dispatch(
        userSlice.actions.set({
          isLogged: true,
          firstName,
          lastName,
          email,
          access_token,
        })
      );
      dispatch(loginSlice.actions.reset({}));
      dispatch(registrationSlice.actions.reset({}));
    } else if (response.data.error) {
      setShowAlert(true);
      setAlertMessage(response.data.message);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <React.Fragment>
      {showAlert && (
        <Alert color="failure" className="mx-4">
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
            onChange={changeHandler}
          />
        </div>
        <Button type="submit" onClick={submitHandler}>
          Qeydiyyat
        </Button>
      </form>
    </React.Fragment>
  );
}

export default RegistrationPage;
