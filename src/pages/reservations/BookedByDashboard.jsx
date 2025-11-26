import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import { Radio, Table } from "antd";
import DateSelect from "../../components/DateSelect";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";

function BookedByDashboard() {
  const [showData, setShowData] = useState("agent_ranking");
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/booked-by-dashboard/`,
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
  const agentRankingData = globalData?.agent_ranking || [];
  const reservationDetails = globalData?.reservation_details || [];

  // columns
  const agentRankingColumns = [
    {
      title: "Booked By",
      dataIndex: "booked_by",
      key: "booked_by",
    },
    {
      title: "Average Cover Agent",
      dataIndex: "average_cover_agent",
      key: "average_cover_agent",
    },
    {
      title: "Total Reservations",
      dataIndex: "total_reservations",
      key: "total_reservations",
    },
    {
      title: "Total Spent",
      dataIndex: "total_spent",
      key: "total_spent",
    },
  ];

  const reservationDetailsColumns = [
    {
      title: "booked_by",
      dataIndex: "booked_by",
      key: "booked_by",
    },
    {
      title: "reservation_name",
      dataIndex: "reservation_name",
      key: "reservation_name",
    },
    {
      title: "area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "average_cover",
      dataIndex: "average_cover",
      key: "average_cover",
    },
    {
      title: "party_size",
      dataIndex: "party_size",
      key: "party_size",
    },
    {
      title: "reservation_date",
      dataIndex: "reservation_date",
      key: "reservation_date",
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "total_spent",
      dataIndex: "total_spent",
      key: "total_spent",
    },
  ];

  return (
    <div>
      {/* Header + Date Filter */}
      <div className="flex justify-between items-center mb-4">
        {/* radio button for group by */}
        <Radio.Group
          defaultValue="agent_ranking"
          buttonStyle="solid"
          onChange={(e) => setShowData(e.target.value)}
        >
          <Radio.Button value="agent_ranking">Agent Ranking</Radio.Button>
          <Radio.Button value="reservation_details">
            Reservation Details
          </Radio.Button>
        </Radio.Group>

        <DateSelect
          initialRange="1m"
          onApply={handleApply}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <IsLoading isLoading={isLoading} />}
      {isError && <IsError isError={isError} error={error} refetch={refetch} />}

      {showData === "agent_ranking" && (
        <div className="mt-4">
          <Table
            rowKey={(record, index) => index}
            dataSource={agentRankingData}
            columns={agentRankingColumns}
            loading={isLoading}
            bordered
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
          />
        </div>
      )}

      {showData === "reservation_details" && (
        <div className="mt-4">
          <Table
            rowKey={(record, index) => index}
            dataSource={reservationDetails}
            columns={reservationDetailsColumns}
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

export default BookedByDashboard;
