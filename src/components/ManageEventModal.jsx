import React, { useState } from "react";
import {
  Modal,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Upload,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function ManageEventModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "Breath of Balance",
    date: dayjs("2025-12-01"),
    time: dayjs("01:00", "HH:mm"),
    endTime: dayjs("02:30", "HH:mm"),
    category: "Yoga Club",
    location: "San Francisco, California",
    description: "",
    maxParticipants: 14,
    tierLevel: "All member",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop"
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleApplyChanges = () => {
    console.log("Updated form data:", formData);
    setIsModalOpen(false);
  };

  const handleDiscard = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (info) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleParticipantChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      maxParticipants:
        type === "increment"
          ? prev.maxParticipants + 1
          : Math.max(1, prev.maxParticipants - 1),
    }));
  };

  return (
    <div className="p-8">
      <button
        onClick={showModal}
        className="w-full py-2 px-4 border border-gray-300  cursor-pointer rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Manage
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleDiscard}
        footer={null}
        closeIcon={<CloseOutlined />}
        width={800}
        className="manage-event-modal"
      >
        <div className="pt-2">
          <h2 className="text-2xl font-semibold mb-6">Manage event</h2>

          <div className="flex gap-6">
            {/* Left side - Image display with change button */}
            <div className="w-2/5">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Event"
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
              <Upload
                showUploadList={false}
                beforeUpload={handleImageUpload}
                accept="image/*"
              >
                <Button className="!h-11 !rounded-full w-full mt-3 !text-base">
                  Change event photo
                </Button>
              </Upload>
            </div>

            {/* Right side - Form fields */}
            <div className="w-3/5 flex flex-col gap-3">
              <Input
                placeholder="Event name"
                value={formData.eventName}
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
                className="!h-11 !bg-gray-50"
              />

              <div className="flex gap-3">
                <DatePicker
                  placeholder="Date"
                  suffixIcon={<CalendarOutlined />}
                  value={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  className="!h-11 flex-1 !bg-gray-50"
                  format="D MMMM YYYY"
                />
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded px-3 h-11">
                  <TimePicker
                    value={formData.time}
                    onChange={(time) => setFormData({ ...formData, time })}
                    format="HH:mm"
                    suffixIcon={null}
                    className="!border-none !bg-transparent !h-full !shadow-none flex-1"
                    style={{ padding: 0 }}
                  />
                  <span className="text-gray-500">-</span>
                  <TimePicker
                    value={formData.endTime}
                    onChange={(endTime) =>
                      setFormData({ ...formData, endTime })
                    }
                    format="HH:mm A"
                    suffixIcon={null}
                    className="!border-none !bg-transparent !h-full !shadow-none flex-1"
                    style={{ padding: 0 }}
                  />
                  <ClockCircleOutlined className="text-gray-400" />
                </div>
              </div>

              <Select
                placeholder="Category"
                suffixIcon={<DownOutlined />}
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                className="!h-11 custom-select-bg"
                options={[
                  { value: "Yoga Club", label: "Yoga Club" },
                  { value: "Fitness Club", label: "Fitness Club" },
                  { value: "Meditation", label: "Meditation" },
                  { value: "Wellness", label: "Wellness" },
                  { value: "Other", label: "Other" },
                ]}
              />

              <Input
                placeholder="Location"
                suffix={<EnvironmentOutlined />}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="!h-11 !bg-gray-50"
              />

              <TextArea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="resize-none !bg-gray-50"
              />

              {/* Advanced options */}
              <div className="mt-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <span className="font-medium">Advanced options</span>
                  <DownOutlined
                    className={`text-xs transition-transform ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showAdvanced && (
                  <div className="flex gap-3 mt-3">
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Max participants
                      </label>
                      <div className="flex items-center border border-gray-300 rounded h-11 bg-gray-50">
                        <input
                          type="number"
                          value={formData.maxParticipants}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxParticipants: parseInt(e.target.value) || 1,
                            })
                          }
                          className="flex-1 px-3 outline-none bg-transparent"
                          min="1"
                        />
                        <Button
                          icon={<MinusOutlined />}
                          onClick={() => handleParticipantChange("decrement")}
                          type="text"
                          className="!border-none"
                        />
                        <Button
                          icon={<PlusOutlined className="text-white" />}
                          onClick={() => handleParticipantChange("increment")}
                          type="text"
                          className="!bg-black !border-none !text-white !rounded-none !rounded-r"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Tier level
                      </label>
                      <Select
                        value={formData.tierLevel}
                        onChange={(value) =>
                          setFormData({ ...formData, tierLevel: value })
                        }
                        suffixIcon={<DownOutlined />}
                        className="!h-11 w-full custom-select-bg"
                        options={[
                          { value: "All member", label: "All member" },
                          { value: "Bronze", label: "Bronze" },
                          { value: "Silver", label: "Silver" },
                          { value: "Gold", label: "Gold" },
                          { value: "Platinum", label: "Platinum" },
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleDiscard}
              className="!h-12 !rounded-full flex-1 !text-base"
            >
              Discard
            </Button>
            <Button
              onClick={handleApplyChanges}
              className="!bg-black !text-white !h-12 !rounded-full flex-1 !text-base hover:!bg-gray-800"
            >
              Apply changes
            </Button>
          </div>
        </div>

        <style>{`
          .custom-select-bg .ant-select-selector {
            background-color: #f9fafb !important;
          }
        `}</style>
      </Modal>
    </div>
  );
}
