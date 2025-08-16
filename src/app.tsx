import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

interface AppProps {
  router: ReturnType<typeof createBrowserRouter>;
}

export const App: React.FC<AppProps> = ({ router }) => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};