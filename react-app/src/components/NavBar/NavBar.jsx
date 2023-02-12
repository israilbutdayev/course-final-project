import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Dropdown,
  Avatar,
  Label,
  TextInput,
  Modal,
  Button,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useLazyRefreshQuery,
  useLazyInfoQuery,
  userSlice,
  registrationSlice,
  loginSlice,
  useLoginMutation,
  useLazyLogoutQuery,
  searchProductsThunk,
} from "../../redux/store";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const errorModalRef = useRef(null);
  const { email, password } = useSelector((state) => state.login);
  const { isLogged, firstName, lastName, access_token } = useSelector(
    (state) => state.user
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [triggerRefresh] = useLazyRefreshQuery();
  const [triggerInfo] = useLazyInfoQuery();
  const [loginQuery] = useLoginMutation();
  const [triggerLogout] = useLazyLogoutQuery();

  function changeHandler(e) {
    e.preventDefault();
    const prop = e.target.id;
    dispatch(loginSlice.actions.apply({ [prop]: e.target.value }));
  }
  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("login form");
    const response = await loginQuery({ email, password });
    const { success, error, message } = response.data;
    if (success) {
      const {
        access_token,
        user: { firstName, lastName, email },
      } = response.data;
      dispatch(
        userSlice.actions.set({
          initialLoad: false,
          isLogged: true,
          email,
          firstName,
          lastName,
          access_token,
        })
      );
      dispatch(loginSlice.actions.reset());
      dispatch(registrationSlice.actions.reset());
      navigate("/", { replace: true });
      setShowLoginModal(false);
    } else if (error) {
      setErrorModalMessage(message);
      setShowErrorModal(true);
    }
  };
  const logoutHandler = (e) => {
    // e.preventDefault();
    triggerLogout(access_token)
      .unwrap()
      .then(() => {
        dispatch(userSlice.actions.reset());
        dispatch(
          userSlice.actions.apply({
            isLogged: false,
          })
        );
        navigate("/", { replace: true });
      });
  };
  const onSearch = (e) => {
    e.preventDefault();
    const data = { title: search };
    dispatch(searchProductsThunk(data));
  };
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
    <React.Fragment>
      <Navbar fluid={true} rounded={true}>
        <div className="flex md:order-6">
          {!isLogged && (
            <Link
              to="/registration"
              className="text-white font-medium text-center text-xs px-2 py-1 rounded-lg rounded-md items-center flex bg-blue-700"
            >
              Qeydiyyat
            </Link>
          )}
          {!isLogged && (
            <React.Fragment>
              <Button
                onClick={() => setShowLoginModal(true)}
                size="xs"
                className="mx-3 order-99"
              >
                Hesaba daxil ol
              </Button>
              <Modal
                show={showLoginModal}
                size="sm"
                popup={true}
                onClose={() => setShowLoginModal(false)}
                position="top-right"
              >
                <Modal.Header />
                <Modal.Body>
                  <form className="space-y-2 px-2 pb-4 sm:pb-6 lg:px-8 xl:pb-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="email" value="Emailinizi daxil edin." />
                      </div>
                      <TextInput
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required={true}
                        onChange={changeHandler}
                        value={email}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="password"
                          value="Şifrənizi daxil edin."
                        />
                      </div>
                      <TextInput
                        id="password"
                        type="password"
                        required={true}
                        onChange={changeHandler}
                        value={password}
                      />
                    </div>
                    <div className="w-full">
                      <Button type="submit" onClick={loginHandler}>
                        Daxil ol.
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </React.Fragment>
          )}
          {isLogged && (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
              className="order-9"
            >
              <Dropdown.Header className="order-9">
                <span className="block text-sm">
                  <Link to="/profile">
                    {firstName} {lastName}
                  </Link>
                </span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="order-8" onClick={logoutHandler}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
          <React.Fragment>
            <Modal
              show={showErrorModal}
              size="sm"
              popup={true}
              onClose={() => {
                setShowErrorModal(false);
              }}
            >
              <Modal.Header />
              <Modal.Body>
                <form ref={errorModalRef} onSubmit={() => {}}>
                  <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      {errorModalMessage}
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        type="submit"
                        color="failure"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </React.Fragment>
        </div>
        <Navbar.Collapse className="order-1 flex items-center">
          <Link to="/">Ana səhifə</Link>
          {isLogged && <Link to="/products">Mənim məhsullarım</Link>}
          <Link to="/search">Ətraflı axtarış</Link>
          <form className="flex">
            <TextInput
              type="text"
              sizing="sm"
              placeholder="Axtarış"
              className=""
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit" className="mx-2" onClick={onSearch}>
              Axtar
            </button>
          </form>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}

//   );
// }
