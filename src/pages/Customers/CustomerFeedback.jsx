import React, { useState } from "react";
import { useGlobalApi } from "../../api/api";
import { Table, Tag, Rate, Card, Statistic, Row, Col } from "antd";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import DateSelect from "../../components/DateSelect";

function CustomerFeedback() {
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: "",
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { globalData, isLoading, isError, error, refetch } = useGlobalApi({
    endPoint: `/metrics/customer-feedback/`,
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  });

  const handleApply = (dates) => {
    setDateRange({
      start_date: dates.startDate,
      end_date: dates.endDate,
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#52c41a";
    if (rating >= 3.5) return "#faad14";
    return "#ff4d4f";
  };

  const columns = [
    {
      title: <span>Date</span>,
      dataIndex: "date",
      key: "date",
      render: (date) => <span className="font-semibold">{date}</span>,
    },
    {
      title: <span>Overall Rating</span>,
      dataIndex: ["averages", "overall"],
      key: "overall",
      render: (rating) => (
        <div className="flex items-center gap-2">
          <Rate disabled value={rating} allowHalf />
          <span style={{ color: getRatingColor(rating), fontWeight: "bold" }}>
            {rating.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: <span>Service</span>,
      dataIndex: ["averages", "service"],
      key: "service",
      render: (rating) => (
        <Tag color={getRatingColor(rating)}>
          {rating > 0 ? rating.toFixed(2) : "N/A"}
        </Tag>
      ),
    },
    {
      title: <span>Food</span>,
      dataIndex: ["averages", "food"],
      key: "food",
      render: (rating) => (
        <Tag color={getRatingColor(rating)}>
          {rating > 0 ? rating.toFixed(2) : "N/A"}
        </Tag>
      ),
    },
    {
      title: <span>Ambience</span>,
      dataIndex: ["averages", "ambience"],
      key: "ambience",
      render: (rating) => (
        <Tag color={getRatingColor(rating)}>
          {rating > 0 ? rating.toFixed(2) : "N/A"}
        </Tag>
      ),
    },
    {
      title: <span>Drinks</span>,
      dataIndex: ["averages", "drinks"],
      key: "drinks",
      render: (rating) => (
        <Tag color={getRatingColor(rating)}>
          {rating > 0 ? rating.toFixed(2) : "N/A"}
        </Tag>
      ),
    },
    {
      title: <span>Total Feedback</span>,
      dataIndex: "details",
      key: "count",
      render: (details) => (
        <span className="font-semibold">{details?.length || 0}</span>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const detailColumns = [
      {
        title: "Overall",
        dataIndex: "overall",
        key: "overall",
        render: (rating) => (
          <Rate disabled value={parseInt(rating)} className="text-sm" />
        ),
      },
      {
        title: "Service",
        dataIndex: "service",
        key: "service",
        render: (rating) => <span>{parseInt(rating) > 0 ? rating : "-"}</span>,
      },
      {
        title: "Food",
        dataIndex: "food",
        key: "food",
        render: (rating) => <span>{parseInt(rating) > 0 ? rating : "-"}</span>,
      },
      {
        title: "Ambience",
        dataIndex: "ambience",
        key: "ambience",
        render: (rating) => <span>{parseInt(rating) > 0 ? rating : "-"}</span>,
      },
      {
        title: "Drinks",
        dataIndex: "drinks",
        key: "drinks",
        render: (rating) => <span>{parseInt(rating) > 0 ? rating : "-"}</span>,
      },
      {
        title: "Customer Notes",
        dataIndex: "notes",
        key: "notes",
        width: "40%",
        render: (notes) => (
          <div className="max-w-md">
            {notes ? (
              <p className="text-sm text-gray-700 italic">"{notes}"</p>
            ) : (
              <span className="text-gray-400">No notes provided</span>
            )}
          </div>
        ),
      },
    ];

    return (
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-3 text-gray-700">
          Individual Feedback Details ({record.details?.length || 0} reviews)
        </h4>
        <Table
          columns={detailColumns}
          dataSource={record.details || []}
          pagination={false}
          rowKey={(_, index) => index}
          size="small"
        />
      </div>
    );
  };

  // Calculate overall statistics
  const calculateStats = () => {
    if (!globalData?.daily_feedback?.length) {
      return {
        avgOverall: 0,
        avgService: 0,
        avgFood: 0,
        avgAmbience: 0,
        avgDrinks: 0,
        totalFeedback: 0,
      };
    }

    const allRatings = globalData.daily_feedback.reduce(
      (acc, day) => {
        return {
          overall: acc.overall + (day.averages.overall || 0),
          service: acc.service + (day.averages.service || 0),
          food: acc.food + (day.averages.food || 0),
          ambience: acc.ambience + (day.averages.ambience || 0),
          drinks: acc.drinks + (day.averages.drinks || 0),
          count: acc.count + (day.details?.length || 0),
        };
      },
      { overall: 0, service: 0, food: 0, ambience: 0, drinks: 0, count: 0 }
    );

    const daysCount = globalData.daily_feedback.length;
    return {
      avgOverall: (allRatings.overall / daysCount).toFixed(2),
      avgService: (allRatings.service / daysCount).toFixed(2),
      avgFood: (allRatings.food / daysCount).toFixed(2),
      avgAmbience: (allRatings.ambience / daysCount).toFixed(2),
      avgDrinks: (allRatings.drinks / daysCount).toFixed(2),
      totalFeedback: allRatings.count,
    };
  };

  const stats = calculateStats();

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-xl ">
            {dateRange.start_date} to {dateRange.end_date} Customer Feedback
          </p>
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

      {!isLoading && !isError && globalData?.daily_feedback?.length > 0 && (
        <>
          {/* Summary Statistics */}
          <Row gutter={16} className="mb-6">
            <Col span={4}>
              <Card>
                <Statistic
                  title="Overall Rating"
                  value={stats.avgOverall}
                  precision={2}
                  valueStyle={{
                    color: getRatingColor(parseFloat(stats.avgOverall)),
                  }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Service"
                  value={stats.avgService}
                  precision={2}
                  valueStyle={{
                    color: getRatingColor(parseFloat(stats.avgService)),
                  }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Food"
                  value={stats.avgFood}
                  precision={2}
                  valueStyle={{
                    color: getRatingColor(parseFloat(stats.avgFood)),
                  }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Ambience"
                  value={stats.avgAmbience}
                  precision={2}
                  valueStyle={{
                    color: getRatingColor(parseFloat(stats.avgAmbience)),
                  }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Drinks"
                  value={stats.avgDrinks}
                  precision={2}
                  valueStyle={{
                    color: getRatingColor(parseFloat(stats.avgDrinks)),
                  }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card>
                <Statistic
                  title="Total Feedback"
                  value={stats.totalFeedback}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Daily Feedback Table */}
          <Table
            columns={columns}
            dataSource={globalData.daily_feedback}
            rowKey="date"
            expandable={{
              expandedRowRender,
              expandedRowKeys,
              onExpandedRowsChange: setExpandedRowKeys,
            }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            loading={isLoading}
            className="shadow-sm"
          />
        </>
      )}
    </div>
  );
}

export default CustomerFeedback;
