import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import Appbar from '../../../components/Appbar/index';
import styles from './Style';

const HomeLayoutRoute = (props) => {
  const classes = styles();
  const { component: YourComponent, ...remainsprops } = props;
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        return (
          <div>
            <Appbar />
            <div>
              <YourComponent {...routeProps} />
            </div>
          </div>
        );
      }}
    />
  );
};
export default HomeLayoutRoute;
