import React, { FC, useState } from "react";
import {
  PieChartOutlined,
  TransactionOutlined,
  ToolOutlined,
  GiftOutlined,
  GoldOutlined,
  ShopOutlined,
  MailOutlined,
  RobotOutlined,
  PhoneOutlined,
  BellOutlined,
  NotificationOutlined,
  ExportOutlined,
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
    },
    {
      key: "pro",
      label: t({ id: "app.sidebar.promotion_tool" }),
      url:'',
      icon: <ToolOutlined />,
      children: [
        {
          key: "promotion",
          label: t({ id: "app.sidebar.promotion_tool.promotion" }),
          url: AppURL.promotion(),
          icon: <GiftOutlined />,
        },
        {
          key: "combo",
          label: t({ id: "app.sidebar.promotion_tool.combo" }),
          url: 'combo',
          icon: <GoldOutlined />,
        },
        {
          key: "production",
          label: t({ id: "app.sidebar.promotion_tool.production" }),
          url: AppURL.production(),
          icon: <ShopOutlined />,
        },
      ],
    },
    {
      key: "sms",
      label: t({ id: "app.sidebar.manage_sms" }),
      url: '',
      icon: <MailOutlined />,
      children: [
        {
          key: "sendSMS",
          label: t({ id: "app.sidebar.manage_sms.send_sms" }),
          url: AppURL.sendSMS(),
          icon: <MailOutlined />,
        },
        {
          key: "manageCampain",
          label: t({ id: "app.sidebar.manage_sms.manage_campaign" }),
          url: AppURL.manageCampain(),
          icon: <RobotOutlined />,
        },
        {
          key: "manageSMSSample",
          label: t({ id: "app.sidebar.manage_sms.manage_sms_sample" }),
          url: AppURL.manageSMSSample(),
          icon: <RobotOutlined />,
        },
        {
          key: "flowSMS",
          label: t({ id: "app.sidebar.manage_sms.flow_sms" }),
          url: AppURL.flowStatusSMS(),
          icon: <RobotOutlined />,
        },
        {
          key: "changePhoneNumber",
          label: t({ id: "app.sidebar.manage_sms.change_phone_number" }),
          url: AppURL.changePhoneNumber(),
          icon: <PhoneOutlined />,
        },
        {
          key: "checkPhoneNumber",
          label: t({ id: "app.sidebar.manage_sms.check_phone_number" }),
          url: AppURL.checkPhoneNumber(),
          icon: <PhoneOutlined />,
        },
        {
          key: "smsToast",
          label: t({ id: "app.sidebar.manage_sms.sms_toast" }),
          url: AppURL.smsToast(),
          icon: <BellOutlined />,
        },
        {
          key: "reportSMS",
          label: t({ id: "app.sidebar.manage_sms.report_sms" }),
          url: AppURL.reportSMS(),
          icon: <NotificationOutlined />,
        },
        {
          key: "reportDaily",
          label: t({ id: "app.sidebar.manage_sms.report_daily" }),
          url: AppURL.reportDaily(),
          icon: <NotificationOutlined />,
        },
        {
          key: "reportMonthly",
          label: t({ id: "app.sidebar.manage_sms.report_monthly" }),
          url: AppURL.reportMonthly(),
          icon: <NotificationOutlined />,
        },
        {
          key: "reportCampain",
          label: t({ id: "app.sidebar.manage_sms.report_campain" }),
          url: AppURL.reportCampain(),
          icon: <NotificationOutlined />,
        },
        {
          key: "exportSMS",
          label: t({ id: "app.sidebar.manage_sms.report_sms" }),
          url: AppURL.exportSMS(),
          icon: <ExportOutlined />,
        },
      ],
    },
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
