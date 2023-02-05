import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useLazyRefreshQuery,
  useLazyInfoQuery,
  userSlice,
} from "../../redux/store";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const { isLogged, firstName, lastName, access_token } = useSelector(
    (state) => state.user
  );
  const [triggerRefresh] = useLazyRefreshQuery();
  const [triggerInfo] = useLazyInfoQuery();
  const init = async () => {
    if (!access_token) {
      const resultRefresh = await triggerRefresh({
        pollingInterval: 1 * 1000,
      }).unwrap();
      if (resultRefresh.success) {
        const { access_token: t_access_token } = resultRefresh;
        const resultInfo = await triggerInfo(t_access_token).unwrap();
        const {
          user: { firstName, lastName, email },
          access_token,
        } = resultInfo;
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
    }
  };
  if (isLogged) {
    setInterval(init, 55 * 1000);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <nav id="navbar">
      <Link to="/">Ana səhifə</Link>
      <Link to="/search">Ətraflı axtarış</Link>
      {!isLogged && <Link to="/login">Daxil ol</Link>}
      {!isLogged && <Link to="/registration">Qeydiyyat</Link>}
      {isLogged && <Link to="/cart">Kart</Link>}
      {isLogged && <Link to="/profile">{`${firstName} ${lastName}`}</Link>}
    </nav>
  );
}
