import { history } from './common/history';
import { HOME_ROUTES } from './contants/Index';
// import HomeLayoutRoute from './common/Layout/HomeLayout/HomeLayout';


// const renderNTVHomeRoutes = () => {
//   let xhtml = null;
//   xhtml = HOME_ROUTES.map((route) => {
//     return (
//       <HomeLayoutRoute
//         key={route.path}
//         path={route.path}
//         component={route.component}
//         exact={route.exact}
//         name={route.name}
//       />
//     );
//   });
//   return xhtml;
// };

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
