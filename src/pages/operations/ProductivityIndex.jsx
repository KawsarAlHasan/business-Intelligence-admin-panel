import React, { useState } from "react";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import { Table } from "antd";
import IsError from "../../components/IsError";
import { useGlobalApi } from "../../api/api";

function ProductivityIndex() {
  const [groupBy, setGroupBy] = useState("week");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/labor-productivity-index/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
    // group_by: groupBy,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  // Rows
  const dataSource = globalData?.daily_data || [];

  console.log("dataSource", dataSource);

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Productivity (Cents per Hour)",
      dataIndex: "productivity_index_cents_per_hour",
      key: "productivity_index_cents_per_hour",
    },
    {
      title: "Productivity (Dollars per Hour)",
      dataIndex: "productivity_index_dollar_per_hour",
      key: "productivity_index_dollar_per_hour",
    },
    {
      title: "Total Labor Hours",
      dataIndex: "total_labor_hours",
      key: "total_labor_hours",
    },
    {
      title: "Total Labor Minutes",
      dataIndex: "total_labor_minutes",
      key: "total_labor_minutes",
    },
    {
      title: "Total Revenue (Cents)",
      dataIndex: "total_revenue_cents",
      key: "total_revenue_cents",
    },
    {
      title: "Total Revenue (Dollars)",
      dataIndex: "total_revenue_dollars",
      key: "total_revenue_dollars",
    },
  ];

  return (
    <div className="p-4">
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

export default ProductivityIndex;
