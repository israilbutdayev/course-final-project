import React, { useCallback, useEffect } from "react";
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
  const { isLogged, firstName, lastName } = useSelector((state) => state.user);
  const [triggerRefresh] = useLazyRefreshQuery();
  const [triggerInfo] = useLazyInfoQuery();
  const init = useCallback(() => {
    const run = async () => {
      const resultRefresh = await triggerRefresh().unwrap();
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
      } else {
        dispatch(userSlice.actions.reset());
        dispatch(
          userSlice.actions.set({ initialLoad: false, isLogged: false })
        );
      }
    };
    run();
  }, [dispatch, triggerInfo, triggerRefresh]);
  useEffect(() => {
    init();
    const interval = setInterval(() => {
      if (isLogged) {
        init();
      }
    }, 55 * 1000);
    return () => clearInterval(interval);
  }, [init, isLogged]);
  return (
    <nav id="navbar">
      <Link to="/">Ana səhifə</Link>
      <Link to="/search">Ətraflı axtarış</Link>
      <Link to="/product">Məhsul</Link>
      {!isLogged && <Link to="/login">Daxil ol</Link>}
      {!isLogged && <Link to="/registration">Qeydiyyat</Link>}
      {isLogged && <Link to="/cart">Kart</Link>}
      {isLogged && <Link to="/profile">{`${firstName} ${lastName}`}</Link>}
    </nav>
  );
}
