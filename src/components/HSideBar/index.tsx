import React, { FC, useState } from "react";
import {
  PieChartOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Link } from "@reach/router";
import { Image, Layout, Menu } from "antd";
import style from "./style.module.scss";
import { ISideBarProps } from "./index.type";
import AppURL from "../../routes/AppURL";
import { useLocale } from "../../locales";
import logoSVG from "../../assets/logo/logo.png";
import iconPNG from "../../assets/logo/favicon.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

const HSideBar: FC = () => {
  const { t } = useLocale();
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };
  const menuItems: ISideBarProps[] = [
    {
      key: "dashboard",
      label: t({ id: "app.sidebar.dashboard" }),
      url: AppURL.home(),
      icon: <PieChartOutlined />,
    },
    {
      key: "transaction",
      label: t({ id: "app.sidebar.transaction" }),
      url: "transaction",
      icon: <TransactionOutlined />,
    }
  ];
  return (
    <Sider collapsible collapsed={collapse} width={250} onCollapse={onCollapse}>
      <div className={style.logo}>
        {collapse ? (
          <Image src={iconPNG} preview={false} width={40} />
        ) : (
          <Image src={logoSVG} preview={false} width={170} />
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {menuItems.map((i) =>
          i.children ? (
            <SubMenu key={i.key} icon={i.icon} title={i.label}>
              {i.children.map((j) => (
                <Menu.Item key={j.key} icon={j.icon}>
                  <Link to={j.url}>{j.label}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={i.key} icon={i.icon}>
              <Link to={i.url}>{i.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default HSideBar;
