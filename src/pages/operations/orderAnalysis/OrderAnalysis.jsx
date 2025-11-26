import React, { useState } from "react";
import { useGlobalApi } from "../../../api/api";
import DateSelect from "../../../components/DateSelect";
import IsLoading from "../../../components/IsLoading";
import IsError from "../../../components/IsError";
import { Radio, Table } from "antd";
import ProductAnalysis from "./ProductAnalysis";

function OrderAnalysis() {
  const [showData, setShowData] = useState("product_analysis");

  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/order-analysis/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  const productAnalysis = globalData?.product_analysis || {};

  // Rows
  const timeSeriesDataSource = globalData?.time_series_data || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Daily Revenue",
      dataIndex: "daily_revenue",
      key: "daily_revenue",
    },
    {
      title: "Daily Orders",
      dataIndex: "daily_orders",
      key: "daily_orders",
    },
  ];

  return (
    <div className="p-4">
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        {/* radio button for group by */}
        <Radio.Group
          defaultValue="product_analysis"
          buttonStyle="solid"
          onChange={(e) => setShowData(e.target.value)}
        >
          <Radio.Button value="product_analysis">Product Analysis</Radio.Button>
          <Radio.Button value="time_series_data">Time Series</Radio.Button>
        </Radio.Group>

        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {showData === "product_analysis" && (
        <div className="mt-4">
          <ProductAnalysis
            productAnalysis={productAnalysis}
            isLoading={isLoading}
          />
        </div>
      )}

      {showData === "time_series_data" && (
        <div className="mt-4">
          <Table
            rowKey={(record, index) => index}
            dataSource={timeSeriesDataSource}
            columns={columns}
            loading={isLoading}
            bordered
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default OrderAnalysis;
