import React from 'react';
import { Route } from 'react-router-dom';


const HomeLayoutRoute = (props) => {

  const { component: YourComponent, ...remainsprops } = props;
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        return (
          <div>
   
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
