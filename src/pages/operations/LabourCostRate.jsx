import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Table } from "antd";

function LabourCostRate() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/labor-cost-rate/`,
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
      title: "Labour Cost Rate (%)",
      dataIndex: "labor_cost_rate",
      key: "labor_cost_rate",
      render: (v) => `${v}%`,
    },
    {
      title: "Labour Cost",
      dataIndex: "labor_cost",
      key: "labor_cost",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
    },
  ];

  return (
    <div className="p-4">
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

export default LabourCostRate;
