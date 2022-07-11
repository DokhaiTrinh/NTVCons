import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInPage from '../../modules/authentication/pages/sign_in';

function PublicRoutes() {
  return (
    <Routes>
      <Route path={SIGN_IN} element={<SignInPage />} />
    </Routes>
  );
}

const SIGN_IN = 'sign_in';

export default PublicRoutes;
