import { useCallback, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Table, Card, Tag, Button, message } from "antd";
// import { dataTransactions } from "./data.transaction";
import { useLocale } from "../../locales";
import { ITransaction } from "../../types/transaction.type";
import { apiListTransaction } from "../../services/transaction.api";
import { tableColumnTextFilterConfig } from "../../utils/filterTable";

type Data = {
  key: string;
  name: string;
};

export default function TransactionScene() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ITransaction[] | undefined>([]);
  const [size, setSize] = useState(10);
  const [disble, setDisble] = useState(false);
  // const dataSource: ITransaction[] = dataTransactions;

  const fetchListTransaction = useCallback(
    async (sizepage: number) => {
      setLoading(true);
      const res: any = await apiListTransaction(sizepage, 0);
      if (res.status === 200) {
        setData(res.data.data);
        setDisble(false);
      } else if (res.status === 500) {
        setData([]);
        message.error({ content: "Error!" });
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchListTransaction(size);
  }, [fetchListTransaction, size]);

  // const onChangePage = async (value: number) => {
  //   setSize(value);
  //   await fetchListTransaction(value);
  // };

  const onPrevious = async () => {
    setSize(size - 10);
    await fetchListTransaction(size);
  };

  const onNext = async () => {
    setSize(size + 10);
    await fetchListTransaction(size).catch(() => {
      setData([]);
      setDisble(true);
      setLoading(false);
    });
  };

  const columns: any = [
    {
      title: t({ id: "app.transaction.table.phone" }),
      key: "sdt",
      fixed: "left",
      render: (text: ITransaction) => (
        <Link to={`/transaction/${text.user.id}`}>{text.user.phone}</Link>
      ),
      ...tableColumnTextFilterConfig<Data>(),
      onFilter: (value: any, record: any) => {
        return record.user.phone
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
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
        return record.product.name
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
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.payment_error" }),
      dataIndex: "payment_error",
      key: "payment_error",
      width: 100,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Card
        title={t({ id: "app.transaction.title" })}
        // extra={
        //   <>
        //     <Space>
        //       <span>Show data:</span>
        //       <InputNumber min={1} value={size} onChange={onChangePage} />
        //     </Space>
        //   </>
        // }
      >
        {/* <Row gutter={16}>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.form_create_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.to_create_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
        </Row>
        <br /> */}
        {/* <Row gutter={16}>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.form_payment_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.to_payment_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
        </Row>
        <br /> */}
        <Table
          loading={loading}
          scroll={{ x: 1500 }}
          dataSource={data}
          columns={columns}
          rowKey={columns.key}
          pagination={false}
        />
        <br/>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            onClick={onPrevious}
            disabled={size === 10 ? true : false}
            icon={<LeftOutlined />}
            style={{marginRight: '10px'}}
          />
          <Button onClick={onNext} disabled={disble} icon={<RightOutlined />} />
        </div>
      </Card>
    </div>
  );
}
