import React, { useState } from "react";
import { useGlobalApi } from "../../../api/api";
import { Card, Col, Radio, Row, Statistic, Table } from "antd";
import IsLoading from "../../../components/IsLoading";
import IsError from "../../../components/IsError";
import DateSelect from "../../../components/DateSelect";

function CustomerInformation() {
  const [showData, setShowData] = useState("most_loyal");

  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/client-crm-analysis/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  const metrics = globalData?.metrics || {};

  // rows for AntD Table
  const dataSource = globalData?.client_segments?.[showData]?.customers || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name || "N/A"}</span>,
    },
    {
      title: "Email",
      dataIndex: "email_address",
      key: "email_address",
      render: (name) => <span>{name || "N/A"}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (name) => <span>{name || "N/A"}</span>,
    },
    {
      title: "Address",
      dataIndex: "address_locality",
      key: "address_locality",
      render: (name) => <span>{name || "N/A"}</span>,
    },
    {
      title: "Visits 365",
      dataIndex: "visits_365",
      key: "visits_365",
      render: (name) => <span>{name || "N/A"}</span>,
    },
    {
      title: "Avg Spend 365",
      dataIndex: "avg_spend_365",
      key: "avg_spend_365",
      render: (name) => <span>{name || "N/A"}</span>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div></div>

        <div>
          <DateSelect
            initialRange="1m"
            onApply={handleApply}
            isLoading={isLoading}
          />
        </div>
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {/* Summary Statistics */}
      <Row gutter={16} className="my-6">
        <Col span={4}>
          <Card>
            <Statistic
              title="Lookback 365 days start"
              value={`${metrics?.lookback_365_days_start || "N/A"}`}
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
              title="Inactivity Threshold days"
              value={`${metrics?.inactivity_threshold_days || "N/A"}`}
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
              title="Loyal Visits Threshold"
              value={metrics?.loyal_visits_threshold || "N/A"}
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
              title="Big Spender Threshold EUR"
              value={metrics?.big_spender_threshold_eur || "N/A"}
              precision={2}
              valueStyle={{
                color: "#52c41a",
              }}
            />
          </Card>
        </Col>
      </Row>

      <Radio.Group
        defaultValue="most_loyal"
        buttonStyle="solid"
        onChange={(e) => setShowData(e.target.value)}
      >
        <Radio.Button value="most_loyal">Most Loyal</Radio.Button>
        <Radio.Button value="potential_loyal">Potential Loyal</Radio.Button>
        <Radio.Button value="lost_loyal">Lost Loyal</Radio.Button>
        <Radio.Button value="big_spenders">Big Spenders</Radio.Button>
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

export default CustomerInformation;
