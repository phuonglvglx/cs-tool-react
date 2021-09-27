import { Layout } from "antd";
import { Router } from "@reach/router";
import HSideBar from "../components/HSideBar";
import HHeader from "../components/HHeader";
import HFooter from "../components/HFooter";
import DashboardScene from "../scenes/dashboard";
import TransactionScene from "../scenes/transactions";
import PrivateRoute from "./PrivateRoute";
import LoginScene from "../scenes/login";
import TransactionDetail from "../scenes/detail";
import { useCallback, useEffect } from "react";
import { apiInfoUser } from "../services/user.api";
import { setToken } from "../services/request";

const { Content } = Layout;

const LayoutAdmin = (props: any) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HSideBar />
      <Layout className="site-layout">
        <HHeader />
        <Content style={{ margin: "16px 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div>{props.children}</div>
        </Content>
        <HFooter />
      </Layout>
    </Layout>
  );
};

const AppRoute = (props: any) => {
  const getInfoUser = useCallback(async () => {
    const res = await apiInfoUser();
    console.log(res);
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getInfoUser();
  }, [getInfoUser]);
  return (
    <Router>
      <LoginScene path="/login" />
      <LayoutAdmin path="/">
        <PrivateRoute as={DashboardScene} path="/" />
        <PrivateRoute as={TransactionScene} path="/transaction" />
        <PrivateRoute as={TransactionDetail} path="/transaction/:id" />
      </LayoutAdmin>
    </Router>
  );
};

export default AppRoute;
