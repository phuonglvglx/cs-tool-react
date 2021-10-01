import { useCallback, useEffect, useState } from "react";
import { Link } from "@reach/router";
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Table, Card, Tag, Button, message, Input, Alert } from "antd";
// import { dataTransactions } from "./data.transaction";
import { useLocale } from "../../locales";
import { ITransaction } from "../../types/transaction.type";
import {
  apiListTransaction,
  apiSearchTransaction,
} from "../../services/transaction.api";
import { tableColumnTextFilterConfig } from "../../utils/filterTable";
import moment from "moment";

const { Search } = Input;

type Data = {
  key: string;
  name: string;
};

export default function TransactionScene() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ITransaction[] | undefined>([]);
  const [size] = useState(10);
  const [skip, setSkip] = useState(0);
  const [disble, setDisble] = useState(false);
  const [textError, setTextError] = useState("");
  // const dataSource: ITransaction[] = dataTransactions;

  const fetchListTransaction = useCallback(
    async (sizepage: number, skip: number) => {
      setLoading(true);
      const res: any = await apiListTransaction(sizepage, skip);
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
    fetchListTransaction(size, skip);
  }, [fetchListTransaction, size, skip]);

  // const onChangePage = async (value: number) => {
  //   setSize(value);
  //   await fetchListTransaction(value);
  // };

  const onPrevious = async () => {
    setSkip(skip - 10);
    await fetchListTransaction(size, skip);
  };

  const onNext = async () => {
    setSkip(skip + 10);
    await fetchListTransaction(size, skip).catch(() => {
      setData([]);
      setDisble(false);
      setLoading(false);
    });
  };

  const onSearchTransaction = async (e: string) => {
    setLoading(true);
    setSkip(0);
    if (e.length < 10) {
      setTextError("Vui lòng nhập đúng số điện thoại");
    } else if (e.length > 11) {
      setTextError("Vui lòng nhập đúng số điện thoại");
    } else {
      await apiSearchTransaction(size, skip, null, e)
        .then((res) => {
          setData(res.data);
          setTextError('')
        })
        .catch(() => {
          setData([]);
        });
    }
    setLoading(false);
  };

  const columns: any = [
    {
      title: t({ id: "app.transaction.table.phone" }),
      key: "sdt",
      fixed: "left",
      render: (text: ITransaction) => (
        <Link
          to={`/transaction/${text.user.id}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {text.user.phone}
        </Link>
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
          case "failed":
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
        {
          text: "failed",
          value: "failed",
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
      key: "transaction_id",
      render: (record: any) => record.id,
      ...tableColumnTextFilterConfig<Data>(),
      onFilter: (value: any, record: ITransaction) => {
        return record.id
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
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
      key: "created_at",
      render: (record: ITransaction) => moment(record.created_at).format("L"),
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
      title: "Refunded",
      key: "refunded",
      render: (record: ITransaction) =>
        record.refund.id === -1 ? (
          ""
        ) : (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ),
    },
    {
      title: "Refund reason",
      key: "refund_reason",
      render: (record: ITransaction) => record.refund.description,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Card title={t({ id: "app.transaction.title" })}>
        <div>
          <h3>Tìm kiếm bằng Phone:</h3>
          <Search
            type="number"
            maxLength={11}
            minLength={10}
            placeholder="Tìm kiếm bằng Phone"
            enterButton="Tìm kiếm"
            onSearch={onSearchTransaction}
            size="large"
            loading={loading}
          />
        </div>
        <br />
        <div>
        {textError ? (
            <Alert message={textError} type="error" showIcon />
          ) : null}
        </div>
        <br />
        <Table
          loading={loading}
          scroll={{ x: 2000 }}
          dataSource={data}
          columns={columns}
          rowKey={columns.key}
          pagination={false}
          tableLayout="auto"
        />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onPrevious}
            disabled={skip === 10 ? true : false}
            icon={<LeftOutlined />}
            style={{ marginRight: "10px" }}
          />
          <Button onClick={onNext} disabled={disble} icon={<RightOutlined />} />
        </div>
      </Card>
    </div>
  );
}
