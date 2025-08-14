import React from "react";
import { RouterProvider } from "react-router-dom";

export const App = ({ router }) => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};