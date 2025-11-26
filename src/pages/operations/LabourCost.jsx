import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import { Table } from "antd";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import DateSelect from "../../components/DateSelect";

function LabourCost() {
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

  // console.log("globalData", globalData);

  const columns = [
    {
      title: <span>Date</span>,
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    // {
    //   title: <span>Department</span>,
    //   dataIndex: "department",
    //   key: "department",
    //   render: (department) => <span>{department}</span>,
    // },
    // {
    //   title: <span>Shift</span>,
    //   dataIndex: "shift",
    //   key: "shift",
    //   render: (shift) => <span>{shift}</span>,
    // },
    {
      title: <span>Revenue</span>,
      dataIndex: "total_revenue",
      key: "total_revenue",
      render: (total_revenue) => <span>${total_revenue || 0}</span>,
    },
    // {
    //   title: <span>Covers</span>,
    //   dataIndex: "covers",
    //   key: "covers",
    //   render: (covers) => <span>{covers}</span>,
    // },
    {
      title: <span>Total labour cost</span>,
      dataIndex: "labor_cost",
      key: "labor_cost",
      render: (labor_cost) => <span>${labor_cost}</span>,
    },
    // {
    //   title: <span>Allocated Labor Cost</span>,
    //   dataIndex: "Covers",
    //   key: "Covers",
    //   render: (Covers) => <span>{Covers}</span>,
    // },
    {
      title: <span>Labor Cost %</span>,
      dataIndex: "labor_cost_rate",
      key: "labor_cost_rate",
      render: (labor_cost_rate) => <span>{labor_cost_rate}%</span>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            Detailed Labor Allocation
          </h2>
        </div>

        <div>
          <DateSelect
            initialRange="1m"
            onApply={handleApply}
            isLoading={isLoading}
          />
        </div>
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {!isLoading && !isError && globalData && globalData?.data?.length > 0 && (
        <div className="mt-4">
          <Table
            columns={columns}
            dataSource={globalData?.data}
            rowKey="date"
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

export default LabourCost;
