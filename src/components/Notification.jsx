import React from 'react';
import { List, Typography, Empty, Drawer } from 'antd';

const { Text } = Typography;

const Notification = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
    {
      id: 2,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
    {
      id: 3,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
    {
      id: 4,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
    {
      id: 5,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
    {
      id: 6,
      title: "You're all set, Emma",
      message: "Your Swedish Massage at 3:00 PM is confirmed",
      time: "Today, 12:04 PM",
      isRead: false,
    },
  ];

  return (
    <div className=" notification-container">
      {notifications.length === 0 ? (
        <Empty 
          description="No notifications yet" 
          className="py-8"
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              className={`px-0 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                !item.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="w-full p-2">
                <div className="flex justify-between items-start mb-1">
                  <Text strong className="text-[15px] text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-[12px] text-gray-500 whitespace-nowrap ml-4">
                    {item.time}
                  </Text>
                </div>
                <Text className="text-[13px] text-gray-600">
                  {item.message}
                </Text>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Notification;