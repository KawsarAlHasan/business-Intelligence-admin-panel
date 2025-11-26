import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Avatar } from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { API } from "../../api/api";

function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI assistant. How can I help you?",
      sender: "bot",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // -------------------------------------------
  //  API CALL FUNCTION
  // -------------------------------------------
  const getBotResponse = async (userMessage) => {
    try {
      const res = await API.post("/chatbot/query", { question: userMessage });

      console.log("res", res);

      return res?.data?.answer || "Sorry, I couldn't process your request.";
    } catch (error) {
      console.error(error, "error");
      return "⚠️ Server error. Please try again later.";
    }
  };

  // -------------------------------------------
  //  SEND MESSAGE
  // -------------------------------------------
  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // fetch AI response
    const botText = await getBotResponse(inputValue);

    const botResponse = {
      id: messages.length + 2,
      text: botText,
      sender: "bot",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                size={40}
                icon={<RobotOutlined />}
                className="bg-white text-blue-500"
              />
              <div>
                <h3 className="text-white font-semibold text-lg">
                  AI Assistant
                </h3>
                <p className="text-blue-100 text-xs">Always online</p>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              className="!text-white hover:bg-white/20"
            />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-1 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    size={32}
                    icon={
                      message.sender === "bot" ? (
                        <RobotOutlined />
                      ) : (
                        <UserOutlined />
                      )
                    }
                    className={
                      message.sender === "bot" ? "bg-blue-500" : "bg-purple-500"
                    }
                  />
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar
                    size={32}
                    icon={<RobotOutlined />}
                    className="bg-blue-500"
                  />
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-4 py-2 border-gray-300"
                size="large"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-none h-10 w-10 flex items-center justify-center"
                size="large"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}

      {!isOpen ? (
        <Button
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-10 flex items-center justify-center"
          size="large"
        >
          Chat with AI
        </Button>
      ) : (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<CloseOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
        />
      )}
    </div>
  );
}

export default AiChat;
