import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Table } from "antd";

function GuestSatisfactionIndex() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/guest-satisfaction/`,
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
  const dataSource = globalData?.daily_data || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Avg Overall Rating",
      dataIndex: "metrics",
      key: "metrics",
      render: (metrics) => `${metrics?.avg_overall_rating}`,
    },
    {
      title: "Guest Satisfaction Index",
      dataIndex: "metrics",
      key: "metrics",
      render: (metrics) => `${metrics?.guest_satisfaction_index}`,
    },
    {
      title: "Review Count",
      dataIndex: "metrics",
      key: "metrics",
      render: (metrics) => `${metrics?.review_count}`,
    },
  ];

  return (
    <div className="p-4">
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        {/* radio button for group by */}
        {/* <Radio.Group
          defaultValue="week"
          buttonStyle="solid"
          onChange={handleGroupByChange}
        >
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
        </Radio.Group> */}
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

export default GuestSatisfactionIndex;
