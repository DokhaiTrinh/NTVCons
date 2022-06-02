import HomePage from '../views/HomePage/HomePage';
import LoginPage from '../views/LoginPage/LoginPage';
import ProjectPage from '../views/ProjectPage/ProjectPage';

export const HOME_ROUTES = [
  {
    path: '/',
    name: 'Home Page',
    exact: true,
    component: HomePage,
  },
  {
    path: '/project',
    name: 'Project Page',
    exact: true,
    component: ProjectPage,
  },
];

export const LOGIN_ROUTES = [
  {
    path: '/login',
    name: 'Login Page',
    exact: true,
    component: LoginPage,
  },
];
