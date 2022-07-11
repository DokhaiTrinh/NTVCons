import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import PrivateRoutes from 'core/routers/private_routes';
import PublicRoutes from 'core/routers/public_routes';
import AuthProvider from '../providers/auth_provider';
import SignInPage from 'modules/authentication/pages/sign_in';

function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PRIVATE} element={<PrivateRoutes />} />
        <Route path={PUBLIC} element={<PublicRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

const PUBLIC = '/*';
const PRIVATE = '/dashboard/*';

export default AppRouter;
