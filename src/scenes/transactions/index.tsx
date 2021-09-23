import { useCallback, useEffect, useState } from "react";
import { Table, Card, Row, Col, DatePicker } from "antd";
import { dataTransactions } from "./data.transaction";
import { useLocale } from "../../locales";
import { ITransaction } from "../../types/transaction.type";
import { apiListTransaction } from "../../services/transaction.api";

export default function TransactionScene() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const dataSource: ITransaction[] = dataTransactions;

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const fetchListTransaction = useCallback(async () => {
    setLoading(true);
    const res: ITransaction[] = await apiListTransaction();
    console.log(res);
  }, []);

  useEffect(()=>{
    fetchListTransaction();
  }, [fetchListTransaction])

  const columns = [
    {
      title: t({ id: "app.transaction.table.phone" }),
      dataIndex: "sdt",
      key: "sdt",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.status" }),
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.product" }),
      dataIndex: "product",
      key: "product",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.invoice" }),
      dataIndex: "invoice",
      key: "invoice",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.transaction_id" }),
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.platform_payment" }),
      dataIndex: "platform_payment",
      key: "platform_payment",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.payment_type" }),
      dataIndex: "payment_type",
      key: "payment_type",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.payment_method" }),
      dataIndex: "payment_method",
      key: "payment_method",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.cost" }),
      dataIndex: "gia_goc",
      key: "gia_goc",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.money" }),
      dataIndex: "money",
      key: "money",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.promotion" }),
      dataIndex: "promotion",
      key: "promotion",
      width: 100,
    },
    {
      title: t({ id: "app.transaction.table.created_date" }),
      dataIndex: "created_date",
      key: "created_date",
      width: 100,
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
      <Card>
        <div>
          <h2>{t({ id: "app.transaction.title" })}</h2>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.form_create_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.to_create_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.form_payment_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
          <Col span={12}>
            <span>{t({ id: "app.transaction.form.to_payment_date" })}</span>
            <DatePicker onChange={onChange} style={{ width: "100%" }} />
          </Col>
        </Row>
        <br />
        <Table
          loading={loading}
          scroll={{ x: 1500 }}
          dataSource={dataSource}
          columns={columns}
        />
      </Card>
    </div>
  );
}
