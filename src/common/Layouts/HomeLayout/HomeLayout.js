import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import NavBar from '../../../Components/Navbar/NavBar';
// import { BrowserRouter as Router } from 'react-router-dom';

const HomeLayoutRoute = (props) => {
  const { component: YourComponent, ...remainsprops } = props;
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        if (!localStorage.getItem("USERINFOR")) {
          return (
            <Redirect
              to={{ pathname: "/", state: { from: routeProps.location } }}
            />
          );
        }
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
