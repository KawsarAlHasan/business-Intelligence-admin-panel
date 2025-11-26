import React, { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import ManageEventModal from "../../components/ManageEventModal";

const eventData = [
  {
    id: 1,
    title: "Breath of Balance",
    clubName: "Yoga club",
    time: "01:00-02:30 AM",
    location: "San Francisco, California",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    date: "2024-12-01",
  },
  {
    id: 2,
    title: "Breath of Balance",
    clubName: "Yoga club",
    time: "01:00-02:30 AM",
    location: "San Francisco, California",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    date: "2024-12-01",
  },
  {
    id: 3,
    title: "Breath of Balance",
    clubName: "Yoga club",
    time: "01:00-02:30 AM",
    location: "San Francisco, California",
    image:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop",
    date: "2024-12-02",
  },
];

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

function UpcomingEvent() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1)); // December 2024

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  const groupEventsByDate = (events) => {
    return events.reduce((acc, event) => {
      const date = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  };

  const groupedEvents = groupEventsByDate(eventData);

  const renderCalendar = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="text-center py-3 text-gray-300 text-sm"
        >
          {prevMonthDays - i}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 1;
      const hasEvent = day <= 4;

      days.push(
        <div
          key={day}
          className={`text-center py-3 text-sm relative ${
            isToday
              ? "bg-black text-white font-semibold"
              : "text-gray-800 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {day}
          {hasEvent && !isToday && (
            <div className="flex justify-center mt-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className=" bg-white min-h-screen p-6">
      {/* Calendar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <LeftOutlined className="text-sm" />
          </button>
          <h2 className="text-lg font-medium">{monthName}</h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RightOutlined className="text-sm" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([date, events]) => (
          <div key={date}>
            <h3 className="text-lg font-semibold mb-4">
              {date.split(",")[0]}{" "}
              <span className="font-normal">
                {date.split(" ").slice(1).join(" ")}
              </span>
            </h3>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {event.clubName}
                    </p>

                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ClockCircleOutlined />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <EnvironmentOutlined />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <ManageEventModal />
                  </div>

                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvent;
