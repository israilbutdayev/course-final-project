import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
    </Route>
  )
);
export default function RootLayout() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Outlet />;
      </div>
    </RouterProvider>
  );
}
