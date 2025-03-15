import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from './AuthenticationContext';

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
