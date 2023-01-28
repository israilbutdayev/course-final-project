import React from "react";
import { Provider } from "react-redux";
import RootLayout from "./pages/RootLayout/RootLayout";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

export default App;
