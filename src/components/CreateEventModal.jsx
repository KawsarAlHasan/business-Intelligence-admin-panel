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
  PictureOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function CreateEventModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    date: null,
    time: null,
    category: undefined,
    location: "",
    description: "",
    maxParticipants: 1,
    tierLevel: "All member",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Form data:", formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      eventName: "",
      date: null,
      time: null,
      category: undefined,
      location: "",
      description: "",
      maxParticipants: 1,
      tierLevel: "All member",
    });
    setImageUrl(null);
  };

  const handleCancel = () => {
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
    <div className="p-8 mr-[-20px]">
      <Button
        onClick={showModal}
        className="!bg-black !rounded-full !text-white !h-10 !px-6 hover:!bg-gray-800"
      >
        Create Event
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<CloseOutlined />}
        width={800}
        className="create-event-modal"
      >
        <div className="pt-2">
          <h2 className="text-2xl font-semibold mb-6">Create event</h2>

          <div className="flex gap-6">
            {/* Left side - Image upload */}
            <div className="w-1/2">
              <Upload
                showUploadList={false}
                beforeUpload={handleImageUpload}
                accept="image/*"
              >
                <div className="bg-gray-100 !w-[335px] !h-[370px] rounded-lg  flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Event"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <PictureOutlined className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-600 text-sm">
                        Add or drag image
                      </span>
                    </>
                  )}
                </div>
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
                className="!h-11"
              />

              <div className="flex gap-3">
                <DatePicker
                  placeholder="Date"
                  suffixIcon={<CalendarOutlined />}
                  value={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  className="!h-11 flex-1"
                />
                <TimePicker
                  placeholder="Time"
                  suffixIcon={<ClockCircleOutlined />}
                  value={formData.time}
                  onChange={(time) => setFormData({ ...formData, time })}
                  className="!h-11 flex-1"
                  format="HH:mm"
                />
              </div>

              <Select
                placeholder="Category"
                suffixIcon={<DownOutlined />}
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                className="!h-11"
                options={[
                  { value: "conference", label: "Conference" },
                  { value: "workshop", label: "Workshop" },
                  { value: "meetup", label: "Meetup" },
                  { value: "seminar", label: "Seminar" },
                  { value: "social", label: "Social" },
                ]}
              />

              <Input
                placeholder="Location"
                suffix={<EnvironmentOutlined />}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="!h-11"
              />

              <TextArea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="resize-none"
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
                      <div className="flex items-center border border-gray-300 rounded h-11">
                        <input
                          type="number"
                          value={formData.maxParticipants}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxParticipants: parseInt(e.target.value) || 1,
                            })
                          }
                          className="flex-1 px-3 outline-none"
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
                        className="!h-11 w-full"
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
              onClick={handleCancel}
              className="!h-12 !rounded-full flex-1 !text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              className="!bg-black !text-white !h-12 !rounded-full flex-1 !text-base hover:!bg-gray-800"
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
