import React from "react";
import RootLayout from "../RootLayout/RootLayout";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Profile from "../../pages/ProfilePage/ProfilePage";
import Cart from "../../pages/CartPage/CartPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);
function RouteProvider() {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default RouteProvider;
