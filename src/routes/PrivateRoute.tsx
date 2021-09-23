// import * as React from "react";
// import { Route, Redirect, RouteProps } from "react-router-dom";
// import { useAppState } from "../stores";

// interface PrivateRouteProps extends RouteProps {
//   component: any;
// }

// const PrivateRoute = (props: PrivateRouteProps) => {
//   const { component: Component, ...rest } = props;
//   const { logged } = useAppState(state => state.user);
//   // const user = localStorage.getItem("auth");
//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         logged ? (
//           <Component {...routeProps} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: routeProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { RouteComponentProps, useNavigate, Redirect } from "@reach/router";
import { useAppState } from "../stores";
import LoginScene from "../scenes/login";

interface PrivateRouteProps extends RouteComponentProps {
  as: React.ElementType<any>;
}

export default function PrivateRoute({as: Comp, ...props}: PrivateRouteProps) {
  const { logged } = useAppState(state => state.user);
  const navigate = useNavigate();
  return logged ? <Comp {...props}/> : <Redirect to="/login"/>;
}
