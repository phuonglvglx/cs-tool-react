import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import { ColumnType } from "antd/lib/table";

export function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  const searchInputHolder: { current: Input | null } = { current: null };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Form onFinish={() => confirm()}>
            <Form.Item initialValue={selectedKeys[0]}>
              <Input
                ref={(node) => (searchInputHolder.current = node)}
                placeholder={"Search"}
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90, marginRight: 8 }}
              >
                Search
              </Button>
              <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputHolder.current?.select());
      }
    },
  };
}
