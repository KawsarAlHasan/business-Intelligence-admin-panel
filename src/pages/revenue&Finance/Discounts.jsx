import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Input, Table } from "antd";

const { Search } = Input;

function Discounts() {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/square-discount-analysis/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
    discount_name: searchText,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  // Main Rows
  const dataSource = globalData?.daily_discounts_data || [];

  // 🔹 Main table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Records",
      dataIndex: "record_count",
      key: "record_count",
    },
    {
      title: "Total Discount (Cents)",
      dataIndex: "total_discount_cents",
      key: "total_discount_cents",
      render: (value) => `${value.toLocaleString()}¢`,
    },
  ];

  // 🔹 Inner breakdown table columns
  const breakdownColumns = [
    {
      title: "Discount Name",
      dataIndex: "discount_name",
      key: "discount_name",
    },
    {
      title: "Total (Cents)",
      dataIndex: "total_cents",
      key: "total_cents",
      render: (value) => `${value.toLocaleString()}¢`,
    },
    {
      title: "Record Count",
      dataIndex: "record_count",
      key: "record_count",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Search by discount name"
          allowClear
          className="!w-[300px]"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {/* Main Table */}
      <div className="mt-4">
        <Table
          rowKey={(record, index) => index}
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <Table
                rowKey={(item, i) => i}
                columns={breakdownColumns}
                dataSource={record.name_breakdown}
                pagination={false}
                size="small"
                bordered
              />
            ),
            rowExpandable: (record) =>
              record.name_breakdown && record.name_breakdown.length > 0,
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

export default Discounts;
