import { RouteComponentProps, useParams } from "@reach/router";
import {
  Card,
  Form,
  Input,
  Row,
  Table,
  Tag,
  Col,
  Button,
  message,
  Popover,
  Popconfirm,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "../../locales";
import {
  apiInfoUserTransaction,
  apiRefundTransaction,
} from "../../services/transaction.api";
import { ISubs, ITransaction } from "../../types/transaction.type";
import { IInfoUser } from "../../types/user.type";
import { tableColumnTextFilterConfig } from "../../utils/filterTable";

type Data = {
  key: string;
  name: string;
};

export default function TransactionDetail(_: RouteComponentProps) {
  const { t } = useLocale();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IInfoUser>();
  const [subscriptions, setSubscriptions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [popover, setPopover] = useState(false);

  const id = params.id;
  const fetchUserTransaction = useCallback(async () => {
    setLoading(true);
    const res: any = await apiInfoUserTransaction(id);
    setData(res.user);
    setSubscriptions(res.subscriptions);
    setTransactions(res.transactions);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchUserTransaction();
  }, [fetchUserTransaction]);

  const onRefundTransaction = async (id: number, desc: string) => {
    if (desc) {
      const res = await apiRefundTransaction({
        transaction_id: id,
        desc: desc,
      });
      if (res.error === 0) {
        message.success({ content: res.message });
        fetchUserTransaction();
      } else {
        message.error({ content: res.message });
      }
    } else {
      message.error({ content: "Vui lòng nhập lý do" });
    }
  };

  const columnSubs = [
    {
      title: "Poduct",
      key: "product",
      render: (record: ISubs) => record.product.name,
    },
    {
      title: "Plan",
      key: "plan",
      render: (record: ISubs) => record.plan.name,
    },
    {
      title: "Start At",
      key: "start_at",
      dataIndex: "start_at",
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
    },
    {
      title: "End At",
      key: "end_at",
      dataIndex: "end_at",
    },
    {
      title: "Auto Renew Gateway",
      key: "auto_renew_gateway",
      dataIndex: "auto_renew_gateway",
    },
    {
      title: "Auto Renew",
      key: "auto_renew",
      dataIndex: "auto_renew",
    },
    {
      title: "Is Active",
      key: "is_active",
      dataIndex: "is_active",
    },
    {
      title: "Last Transaction ID",
      key: "last_transaction_id",
      dataIndex: "last_transaction_id",
    },
  ];

  const columns: any = [
    {
      title: t({ id: "app.transaction.table.status" }),
      key: "status",
      render: (record: ITransaction) => {
        switch (record.status) {
          case "pending":
            return <Tag color="orange">{record.status}</Tag>;
          case "succeed":
            return <Tag color="blue">{record.status}</Tag>;
          default:
            <Tag color="red">{record.status}</Tag>;
        }
      },
      filters: [
        {
          text: "pending",
          value: "pending",
        },
        {
          text: "succeed",
          value: "succeed",
        },
      ],
      onFilter: (value: any, record: ITransaction) =>
        record.status.startsWith(value),
      filterSearch: true,
      fixed: "left",
    },
    {
      title: t({ id: "app.transaction.table.product" }),
      key: "product",
      render: (record: any) => record.product.name,
      fixed: "left",
      ...tableColumnTextFilterConfig<Data>(),
      onFilter: (value: any, record: ITransaction) => {
        return record.product
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: t({ id: "app.transaction.table.invoice" }),
      dataIndex: "invoice_no",
      key: "invoice",
      ...tableColumnTextFilterConfig<Data>(),
      onFilter: (value: any, record: ITransaction) => {
        return record.invoice_no
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: t({ id: "app.transaction.table.transaction_id" }),
      dataIndex: "id",
      key: "transaction_id",
    },
    {
      title: t({ id: "app.transaction.table.platform_payment" }),
      dataIndex: "platform_payment",
      key: "platform_payment",
    },
    {
      title: t({ id: "app.transaction.table.payment_type" }),
      dataIndex: "payment_type",
      key: "payment_type",
    },
    {
      title: t({ id: "app.transaction.table.payment_method" }),
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: t({ id: "app.transaction.table.selling_price" }),
      key: "gia_goc",
      render: (record: any) => record.product.selling_price,
    },
    {
      title: t({ id: "app.transaction.table.money" }),
      dataIndex: "total_amount",
      key: "money",
    },
    {
      title: t({ id: "app.transaction.table.promotion" }),
      key: "promotion",
      render: (record: any) => record.discount.promo_code,
    },
    {
      title: t({ id: "app.transaction.table.created_date" }),
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: t({ id: "app.transaction.table.payment_date" }),
      dataIndex: "payment_date",
      key: "payment_date",
    },
    {
      title: t({ id: "app.transaction.table.payment_error" }),
      dataIndex: "payment_error",
      key: "payment_error",
    },
    {
      title: t({ id: "app.promotion_tool.action" }),
      key: "action",
      render: (record: ITransaction) => {
        if (record.status === "succeed") {
          return (
            <Popconfirm
              icon={null}
              placement="left"
              title={
                <div>
                  <TextArea
                  rows={4}
                    value={desc}
                    placeholder="Nhập lý do !"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </div>
              }
              onConfirm={() => onRefundTransaction(record.id, desc)}
            >
              <Button type="primary">Refund</Button>
            </Popconfirm>
          );
        }
      },
      fixed: "right",
    },
  ];
  return (
    <Card title={"Thông tin người dùng"}>
      {data ? (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item initialValue={data?.email} label="Email" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item initialValue={data?.phone} label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={data?.first_name}
                label="First Name"
                name="first_name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={data?.last_name}
                label="Last Name"
                name="last_name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={data?.date_joined}
                label="Date Joined"
                name="date_joined"
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Form.Item initialValue={data?.email} label="Email" name="email">
            <Input />
          </Form.Item> */}
          </Row>
        </Form>
      ) : null}
      <h3>List Subscriptions</h3>
      {subscriptions ? (
        <Table
          loading={loading}
          scroll={{ x: 1500 }}
          columns={columnSubs}
          dataSource={subscriptions}
        />
      ) : null}
      <h3>List Transactions</h3>
      {transactions ? (
        <Table
          loading={loading}
          scroll={{ x: 1500 }}
          columns={columns}
          dataSource={transactions}
        />
      ) : null}
    </Card>
  );
}
