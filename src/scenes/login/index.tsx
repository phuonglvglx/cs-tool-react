import { Card, Form, Input, Button } from "antd";
import { FC } from "react";
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useAppDispatch } from "../../stores";
import { loginAsync } from "../../stores/user.store";
import { IUser } from "../../types/user.type";
import styles from "./style.module.scss";

export default function LoginScene(_: RouteComponentProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (form: IUser) => {
    const res: any = await dispatch(await loginAsync(form));
    if (res.key) {
      navigate('/')
    } else {
      console.log("error");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.wrapperLogin}>
      <Card>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
