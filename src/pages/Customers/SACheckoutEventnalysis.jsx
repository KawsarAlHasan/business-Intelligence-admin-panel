import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Radio, Table } from "antd";

function SACheckoutEventnalysis() {
  const [show, setShow] = useState("country_checkout");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/ga-booking-analytics/`,
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
  const geographicTrendsDataSource =
    globalData?.aggregates?.geographic_trends || [];

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: " Checkouts Day",
      dataIndex: "total_checkouts_day",
      key: "total_checkouts_day",
    },
  ];

  const countryBreakdownColumns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Checkouts",
      dataIndex: "checkouts",
      key: "checkouts",
    },
  ];

  const aggregatesColumns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Total Checkouts",
      dataIndex: "total_checkouts",
      key: "total_checkouts",
    },
  ];

  return (
    <div className="p-4">
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        {/* radio button for group by */}
        <Radio.Group
          defaultValue="country_checkout"
          buttonStyle="solid"
          onChange={(e) => setShow(e.target.value)}
        >
          <Radio.Button value="country_checkout">Country Checkout</Radio.Button>
          <Radio.Button value="geographic_trends">
            Geographic Trends
          </Radio.Button>
        </Radio.Group>
        <div></div>

        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {show === "country_checkout" && (
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
                  columns={countryBreakdownColumns}
                  dataSource={record?.country_breakdown}
                  pagination={false}
                  size="small"
                  bordered
                />
              ),
              rowExpandable: (record) =>
                record.country_breakdown && record.country_breakdown.length > 0,
            }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
          />
        </div>
      )}

      {show === "geographic_trends" && (
        <div className="mt-4">
          <Table
            rowKey={(record, index) => index}
            dataSource={geographicTrendsDataSource}
            columns={aggregatesColumns}
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

export default SACheckoutEventnalysis;
