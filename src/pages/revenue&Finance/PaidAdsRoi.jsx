import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Table } from "antd";

function PaidAdsRoi() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/paid-ads-roi/`,
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

  console.log("dataSource", dataSource);

  // AntD Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const campaignMetricsColumns = [
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Roi",
      dataIndex: "roi",
      key: "roi",
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
                columns={campaignMetricsColumns}
                dataSource={record?.campaign_metrics}
                pagination={false}
                size="small"
                bordered
              />
            ),
            rowExpandable: (record) =>
              record.campaign_metrics && record.campaign_metrics.length > 0,
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

export default PaidAdsRoi;
