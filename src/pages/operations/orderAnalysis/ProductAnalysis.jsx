import { useState } from "react";
import { Card, Col, Radio, Row, Statistic, Table } from "antd";

function ProductAnalysis({ productAnalysis, isLoading }) {
  const [showData, setShowData] = useState("best_sellers_by_revenue");

  // rows for AntD Table
  const dataSource = productAnalysis?.[showData] || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantity_sold",
      key: "quantity_sold",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
    },
    {
      title: "Revenue Share %",
      dataIndex: "revenue_share_percent",
      key: "revenue_share_percent",
      render: (revenue_share_percent) => `${revenue_share_percent}%`,
    },
  ];

  return (
    <div>
      {/* Summary Statistics */}
      <Row gutter={16} className="mb-6">
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Orders"
              value={`$${productAnalysis?.overall_summary?.total_orders || 0}`}
              precision={2}
              valueStyle={{
                color: "#52c41a",
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={`$${productAnalysis?.overall_summary?.total_revenue || 0}`}
              precision={2}
              valueStyle={{
                color: "#52c41a",
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Items Sold"
              value={
                productAnalysis?.overall_summary?.total_unique_items_sold || 0
              }
              precision={2}
              valueStyle={{
                color: "#52c41a",
              }}
            />
          </Card>
        </Col>
      </Row>

      <Radio.Group
        defaultValue="best_sellers_by_revenue"
        buttonStyle="solid"
        onChange={(e) => setShowData(e.target.value)}
      >
        <Radio.Button value="best_sellers_by_revenue">
          Best Sellers By Revenue
        </Radio.Button>
        <Radio.Button value="worst_sellers_by_revenue">
          Worst Sellers By Revenue
        </Radio.Button>
        <Radio.Button value="best_sellers_by_count">
          Best Sellers By Count
        </Radio.Button>
        <Radio.Button value="worst_sellers_by_count">
          Worst Sellers By Count
        </Radio.Button>
        <Radio.Button value="all_products">All Products</Radio.Button>
      </Radio.Group>

      <div className="mt-4">
        <Table
          rowKey={(record, index) => index}
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </div>
    </div>
  );
}

export default ProductAnalysis;
