import HomePage from '../views/HomePage/HomePage';
import LoginPage from '../views/LoginPage/LoginPage';
export const HOME_ROUTES = [
  {
    path: '/',
    name: 'Home Page',
    exact: true,
    component: HomePage,
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
