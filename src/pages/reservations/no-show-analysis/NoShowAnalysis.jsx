import React, { useState } from "react";
import { Radio, Table } from "antd";
import { useGlobalApi } from "../../../api/api";
import DateSelect from "../../../components/DateSelect";
import IsLoading from "../../../components/IsLoading";
import IsError from "../../../components/IsError";

function NoShowAnalysis() {
  const [groupBy, setGroupBy] = useState("week");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/reservation-rate-analysis/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
    group_by: groupBy,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  // Rows
  const dataSource = globalData?.rates_data || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Interval",
      dataIndex: "interval",
      key: "interval",
    },
    {
      title: "Total Reservations",
      dataIndex: "total_reservations",
      key: "total_reservations",
    },
    {
      title: "Attended",
      dataIndex: "attended_count",
      key: "attended_count",
    },
    {
      title: "No-Show",
      dataIndex: "no_show_count",
      key: "no_show_count",
    },
    {
      title: "Cancelled",
      dataIndex: "cancellation_count",
      key: "cancellation_count",
    },
    {
      title: "Attendance Rate (%)",
      dataIndex: "attendance_rate",
      key: "attendance_rate",
      render: (v) => `${v}%`,
    },
    {
      title: "No-Show Rate (%)",
      dataIndex: "no_show_rate",
      key: "no_show_rate",
      render: (v) => `${v}%`,
    },
    {
      title: "Cancellation Rate (%)",
      dataIndex: "cancellation_rate",
      key: "cancellation_rate",
      render: (v) => `${v}%`,
    },
  ];

  return (
    <div className="p-4">
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        {/* radio button for group by */}
        <Radio.Group
          defaultValue="week"
          buttonStyle="solid"
          onChange={handleGroupByChange}
        >
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
        </Radio.Group>

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

export default NoShowAnalysis;
