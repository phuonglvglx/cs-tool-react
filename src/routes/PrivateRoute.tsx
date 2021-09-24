import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { useAppState } from "../stores";

interface PrivateRouteProps extends RouteComponentProps {
  as: React.ElementType<any>;
}

export default function PrivateRoute({as: Comp, ...props}: PrivateRouteProps) {
  const { logged } = useAppState(state => state.user);
  return logged ? <Comp {...props}/> : <Redirect to="/login"/>;
}
