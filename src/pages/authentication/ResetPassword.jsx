import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/Frame 10.png";
import { API } from "../../api/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const uidb64 = searchParams.get("uidb64");

  const [loading, setLoading] = useState(false); // Loading state for login button

  const onFinish = async (values) => {
    setLoading(true); // Start loading when submitting form
    try {
      const response = await API.post("/users/password-reset/confirm/", {
        uidb64: uidb64,
        new_password: values.password,
        token: token,
      });

      console.log("response", response);

      localStorage.setItem("token", response.data.access);

      // Show success message
      message.success("Password updated successfully!");
      window.location.href = "/";
    } catch (error) {
      console.log("error", error);
      message.error(
        error?.response?.data?.detail || "Login failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please input valid email and password.");
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen main-bg ">
        <div className="p-8 pt-5 pb-7 shadow-lg rounded-lg w-[530px] h-[635px] pt-[50px]">
          <img src={logo} alt="Logo" className="mx-auto !my-6" />
          <h2 className="text-[30px] text-[#222222] font-bold text-center !mb-6">
            Reset Password
          </h2>
          <h6 className="text-center text-[#4E4E4E] !mb-6 text-[18px]">
            Please enter your name and password to continue
          </h6>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // autoComplete="off"
          >
            {/* Password Field */}
            <div className="mb-4">
              <label className="text-[18px] text-[#222222] block mb-1">
                New Password:
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your New Password!",
                  },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  className="p-3 text-[16px]"
                  placeholder="Enter your new password..."
                />
              </Form.Item>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label className="text-[18px] text-[#222222] block mb-1">
                Confirm Password:
              </label>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="p-3 text-[16px] "
                  placeholder="Confirm your password..."
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="w-full py-6 text-[18px] font-semibold my-main-button"
                  loading={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
