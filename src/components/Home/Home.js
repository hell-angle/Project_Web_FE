import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Container } from "@mui/material";
import axios from "axios";
import "./Home.module.css";
import { FaUser, FaComments } from "react-icons/fa"; // Import icons for user and chatbox

const Home = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatWrapperRef = useRef();

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = { type: "user", text: message };
      setChat((prevChat) => [...prevChat, newMessage]);

      try {
        const response = await axios.post(
          "https://chatbox-project-final.onrender.com/user/chatbox",
          { prompt: message },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const aiMessage = { type: "ai", text: response.data.text };
        setChat((prevChat) => [...prevChat, aiMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  }, [chat]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box
          ref={chatWrapperRef}
          style={{
            height: "400px",
            border: "1px solid #ccc",
            overflow: "auto",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "30px",
          }}
        >
          {chat.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: item.type === "ai" ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              {item.type === "user" && ( 
                <div style={{ marginRight: "8px" }}>
                  <FaUser />
                </div>
              )}
              <div
                style={{
                  backgroundColor: item.type === "ai" ? "#DCF8C6" : "#E3F2FD",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  maxWidth: "70%",
                }}
              >
                {item.text}
              </div>
              {item.type === "ai" && ( 
                <div style={{ marginLeft: "8px" }}>
                  <FaComments />
                </div>
              )}
            </div>
          ))}
        </Box>
        <Box display="flex" marginTop="10px">
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ marginLeft: "8px" }}
          >
            Send
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Home;
