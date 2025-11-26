import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Card, Col, Row, Statistic, Table } from "antd";

function IncomeDashboard() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/income-dashboard/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  // Rows
  const dataSource = globalData?.data || [];

  const aggregates = globalData?.aggregates || {};

  console.log("dataSource", globalData?.aggregates);

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Gross Income",
      dataIndex: "gross_income",
      key: "gross_income",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
    },
    {
      title: "Total Tips",
      dataIndex: "total_tips",
      key: "total_tips",
    },
  ];

  return (
    <div>
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {/* Summary Statistics */}
      <Row gutter={16} className="mb-6">
        <Col span={4}>
          <Card>
            <Statistic
              title="Miscellaneous Income"
              value={aggregates?.misc_income || 0}
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
              title="Total Gross Income"
              value={aggregates?.total_gross_income || 0}
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
              value={aggregates?.total_revenue || 0}
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
              title="Total Tips"
              value={aggregates?.total_tips || 0}
              precision={2}
              valueStyle={{
                color: "#52c41a",
              }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-4">
        <Table
          rowKey={(record) => record.interval}
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

export default IncomeDashboard;
