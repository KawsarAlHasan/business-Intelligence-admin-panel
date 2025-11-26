import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Table } from "antd";

function SalesByErver() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/sales-by-server/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
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
  const dataSource = globalData?.data || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Daily Total Sales",
      dataIndex: "daily_total_sales",
      key: "daily_total_sales",
    },
  ];

  const salesByServerColumns = [
    {
      title: "employee_id",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Sales",
      dataIndex: "total_sales",
      key: "total_sales",
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
          rowKey={(record, i) => i}
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <Table
                rowKey={(item, i) => i}
                columns={salesByServerColumns}
                dataSource={record.sales_by_server}
                pagination={false}
                size="small"
                bordered
              />
            ),
            rowExpandable: (record) =>
              record.sales_by_server && record.sales_by_server.length > 0,
          }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </div>
    </div>
  );
}

export default SalesByErver;
