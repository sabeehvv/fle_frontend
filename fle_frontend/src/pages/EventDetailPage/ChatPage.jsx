import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import toast from "react-hot-toast";
import axiosInstance from "../../components/Axios/Axios";

const Chat = ({ event_id }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [chatmessages, setChatMessages] = useState([]);
  const [webSocket, setWebSocket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  // const websocketUrl = `ws://127.0.0.1:8000/ws/event/${event_id}/chat/`;

  const websocketUrl = `wss://shoppershope.online/ws/event/${event_id}/chat/`;

  const messageDayDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const timeDifference = currentDate - messageDate;


    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return messageDate.toLocaleDateString(undefined, options);
    }
  };

  const getMessageDisplayTime = (timestamp) => {
    const messageDate = new Date(timestamp);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return messageDate.toLocaleTimeString(undefined, options);
  };

  const fetchData = () => {
    axiosInstance
      .get(`chat/event/${event_id}/`)
      .then((response) => {
        setChatMessages(response.data);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    fetchData();
  }, [event_id]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatmessages]);

  useEffect(() => {
    const socket = new WebSocket(websocketUrl);
    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setWebSocket(socket);
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setChatMessages([...chatmessages, message.message]);
    };
    return () => {
      socket.close();
    };
  }, [chatmessages]);

  const sendMessage = () => {
    if (webSocket && newMessage.trim() !== "") {
      const messageData = {
        receiver: event_id,
        content: newMessage,
        sender: userInfo.id,
      };
      webSocket.send(JSON.stringify(messageData));
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "20px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" align="center">
        Event Chat
      </Typography>
      <List
        style={{
          maxHeight: "290px",
          minHeight: "230px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
        ref={chatContainerRef}
      >
        {chatmessages.map((message, index) => (
          <React.Fragment key={index}>
            {index === 0 ||
            messageDayDate(message.timestamp) !==
              messageDayDate(chatmessages[index - 1].timestamp) ? (
              <>
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "0.8rem", textDecoration: "underline" }}
                  >
                    {messageDayDate(message.timestamp)}
                  </Typography>
                </ListItem>
              </>
            ) : null}
            {index === 0 ||
            message.sender.id !== chatmessages[index - 1].sender.id ? (
              <ListItem>
                <Typography variant="h6">
                  <strong>{message.sender.name} </strong>
                </Typography>
              </ListItem>
            ) : null}
            <ListItem>
              <div
                style={{
                  overflowWrap: "break-word",
                  wordBreak: "break-all",
                  flex: 1,
                }}
              >
                {message.content}
              </div>
            </ListItem>
            <ListItem
              style={{
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                }}
              >
                {getMessageDisplayTime(message.timestamp)}
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: "1", marginRight: "10px" }}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#cf74d0",
          }}
        >
          Send
        </Button>
      </div>
    </Container>
  );
};

export default Chat;
