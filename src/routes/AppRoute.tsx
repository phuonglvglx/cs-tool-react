import { Breadcrumb, Layout } from "antd";
import { Link, Router, useLocation } from "@reach/router";
import HSideBar from "../components/HSideBar";
import HHeader from "../components/HHeader";
import HFooter from "../components/HFooter";
import DashboardScene from "../scenes/dashboard";
import TransactionScene from "../scenes/transactions";
import PrivateRoute from "./PrivateRoute";
import LoginScene from "../scenes/login";
import TransactionDetail from "../scenes/detail";

const { Content } = Layout;

const LayoutAdmin = (props: any) => {
  const location = useLocation();
  const pathname = location.pathname.split("/").slice(1);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HSideBar />
      <Layout className="site-layout">
        <HHeader />
        <Content style={{ margin: "16px 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            {pathname.map((i, index) => (
              <Breadcrumb.Item key={index}>
                {index + 1 === pathname.length ? (
                  i
                ) : (
                  <Link to={`/${i}`}>
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </Link>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div>{props.children}</div>
        </Content>
        <HFooter />
      </Layout>
    </Layout>
  );
};

const AppRoute = () => {
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
