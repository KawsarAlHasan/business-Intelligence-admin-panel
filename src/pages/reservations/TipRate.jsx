import React, { useState } from "react";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Table } from "antd";
import { useGlobalApi } from "../../api/api";

function TipRate() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/tip-rate/`,
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

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tip Rate Percentage",
      dataIndex: "tip_rate_percentage",
      key: "tip_rate_percentage",
    },
    {
      title: "Total Tips USD",
      dataIndex: "total_tips_usd",
      key: "total_tips_usd",
    },
    {
      title: "Total Revenue Usd",
      dataIndex: "total_revenue_usd",
      key: "total_revenue_usd",
    },
  ];

  return (
    <div>
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

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

export default TipRate;
