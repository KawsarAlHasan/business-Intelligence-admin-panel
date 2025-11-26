import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/Frame 10.png";
import { API } from "../../api/api";

function RegisterWithToken() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false); // Loading state for login button

  const onFinish = async (values) => {
    setLoading(true); // Start loading when submitting form
    try {
      const response = await API.post("/users/register/", {
        first_name: values.first_name,
        last_name: values.last_name,
        email: email,
        password: values.password,
        token: token,
      });

      console.log("response", response);

      //   // If successful, save the token in localStorage
      localStorage.setItem("token", response.data.access);

      // Show success message
      message.success("Registration successful!");

      //   // Redirect to the admin dashboard (replace with your route)
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
        <div className="p-8 pt-5 pb-7 shadow-lg rounded-lg w-[530px] h-[635px]">
          <img src={logo} alt="Logo" className="mx-auto !my-6" />
          <h2 className="text-[30px] text-[#222222] font-bold text-center !mb-6">
            Register to Account
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
            {/* First Name Field */}
            <div className="mb-3">
              <label className="text-[18px] text-[#222222] block mb-1">
                First Name:
              </label>
              <Form.Item
                name="first_name"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input
                  type="text"
                  className="p-3"
                  placeholder="Enter your first name..."
                />
              </Form.Item>
            </div>

            {/* Last Name Field */}
            <div className="mb-3">
              <label className="text-[18px] text-[#222222] block mb-1">
                Last Name:
              </label>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input
                  type="text"
                  className="p-3"
                  placeholder="Enter your last name..."
                />
              </Form.Item>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="text-[18px] text-[#222222] block mb-1">
                Password:
              </label>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  className="p-3"
                  placeholder="Enter your password..."
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full py-6 text-[18px] font-semibold my-main-button"
                  loading={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterWithToken;
