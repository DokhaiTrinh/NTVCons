import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../../../Components/NavBar';
const HomeLayoutRoute = (props) => {
  const { component: YourComponent, ...remainsprops } = props;
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        return (
          <div>
            <NavBar />
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
