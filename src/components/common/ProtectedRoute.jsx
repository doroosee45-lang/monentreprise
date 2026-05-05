import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    const dest = ['super_admin', 'admin', 'manager'].includes(user?.role) ? '/admin/dashboard' : '/client/dashboard';
    return <Navigate to={dest} replace />;
  }
  return children;
};
