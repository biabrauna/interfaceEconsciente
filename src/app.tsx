import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/lib/toast';

interface AppProps {
  router: ReturnType<typeof createBrowserRouter>;
}

export const App: React.FC<AppProps> = ({ router }) => {
  return (
    <React.StrictMode>
      <ToastProvider />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};