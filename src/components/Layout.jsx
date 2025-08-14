import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}