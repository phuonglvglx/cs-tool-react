import { Dropdown, Layout, Select, Avatar, Menu, Button } from "antd";
import { useAppDispatch, useAppState } from "../../stores";
import { logoutAsync, setUserItem } from "../../stores/user.store";
import { UserOutlined } from "@ant-design/icons";
import { navigate } from "@reach/router"
import styles from "./style.module.scss";

const { Header } = Layout;
const HHeader = () => {
  const { logged, locale } = useAppState((state) => state.user);
  const dispatch = useAppDispatch();
  // const selectLocale = ({ key }: { key: any }) => {
  //   dispatch(setUserItem({ locale: key }));
  //   localStorage.setItem("locale", key);
  // };

  const handleChange = (value: any) => {
    dispatch(setUserItem({ locale: value }));
    localStorage.setItem("locale", value);
  };

  const handleLogOut = async () => {
    const res = await dispatch(await logoutAsync());
    if(res){
      navigate('/login')
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          onClick={() => {
            handleLogOut();
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, backgroundColor: "white" }}
    >
      <div className={styles.myHeader}>
        <div>
          <Select
            defaultValue={locale}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Select.Option value="vi_VN">Vietnamese</Select.Option>
            <Select.Option value="en_US">English</Select.Option>
          </Select>
        </div>
        <div>
          {logged ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                href='/#'
              >
                <Avatar icon={<UserOutlined />} />
              </a>
            </Dropdown>
          ) : null}
        </div>
      </div>
    </Header>
  );
};

export default HHeader;
