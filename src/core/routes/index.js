import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from '../providers/auth_provider';
import MainPage from 'core/pages/main';
import LoginPage from 'modules/authentication/pages/Login';
import RegisterPage from 'modules/authentication/pages/Register';

import * as ROUTES from './routeName';
import DashboardPage from 'modules/dashboard/pages/Dashboard';
import ProjectManagementPage from 'modules/project/pages/ProjectManagement';
import ProductManagementPage from 'modules/product/pages/ProductManagement';
import EmployeeManagementPage from 'modules/employee/pages/EmployeeManagement';

export * from './routeName';

function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectManagementPage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductManagementPage />} />
          <Route path={ROUTES.EMPLOYEES} element={<EmployeeManagementPage />} />
        </Route>

        <Route path={ROUTES.AUTH}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;
