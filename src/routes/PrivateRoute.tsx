import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useAppState } from "../stores";
import LoginScene from "../scenes/login";

interface PrivateRouteProps extends RouteComponentProps {
  as: React.ElementType<any>;
}

export default function PrivateRoute({as: Comp, ...props}: PrivateRouteProps) {
  const { logged } = useAppState(state => state.user);
  return logged ? <Comp {...props}/> : <LoginScene path="login"/>;
}
