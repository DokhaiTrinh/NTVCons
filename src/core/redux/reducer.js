import loginSlice from 'modules/authentication/slices/login';
import menuSlice from 'core/redux/slices/menu';

const rootReducer = {
  signIn: loginSlice,
  menu: menuSlice,
};

export { rootReducer };
