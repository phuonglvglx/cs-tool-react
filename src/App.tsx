import { FC, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { localeConfig } from "./locales";
import { ConfigProvider } from "antd";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import { useAppState } from "./stores";
import enUS from "antd/es/locale/en_US";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
// import { setToken } from "./services/request";
import { navigate } from "@reach/router";

const App: FC = () => {
  const { locale } = useAppState((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (locale === "en_US") {
      moment.locale("en");
    } else if (locale === "vi_VN") {
      moment.locale("vi-vn");
    }
    if (token) {
      // setToken(token);
    } else {
      navigate("/login");
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale === "en_US") {
      return enUS;
    } else if (locale === "vi_VN") {
      return viVN;
    }
  };
  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider
        locale={locale.split("_")[0]}
        messages={localeConfig[locale]}
      >
        <AppRoute />
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
