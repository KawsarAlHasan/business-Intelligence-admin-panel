import { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { FcInvite } from "react-icons/fc";

import { API } from "../api/api";

const InviteUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const res = await API.put("/users/create/", values);
      console.log(res, "res");

      message.success("New admin invited successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err, "res");
      message.error(
        err.response?.data?.error[0] || "Failed to new admin invite"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={showModal}
        className="flex items-center gap-2 px-1 py-2 cursor-pointer"
      >
        <FcInvite size={25} /> Invite New Admin
      </div>

      <Modal
        title="Invite New Admin"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // we'll use Form submit button instead
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="New Admin Email"
            name="email"
            rules={[
              { required: true, message: "Please enter new admin email" },
            ]}
          >
            <Input type="email" placeholder="Enter new admin email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="my-main-button"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Invite
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InviteUser;
