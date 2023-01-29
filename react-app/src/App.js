import React from "react";
import { Provider } from "react-redux";
import RouteProvider from "./router/RouteProvider/RouteProvider";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RouteProvider />
    </Provider>
  );
}

export default App;
