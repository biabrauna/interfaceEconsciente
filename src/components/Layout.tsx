import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryProvider } from '@/providers/QueryProvider';
import Onboarding from './Onboarding';
import { useAuth } from '@/hooks/useAuth';

const LayoutContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Outlet />
      {user && <Onboarding />}
    </>
  );
};

const Layout: React.FC = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <LayoutContent />
      </AuthProvider>
    </QueryProvider>
  );
};

export default Layout;