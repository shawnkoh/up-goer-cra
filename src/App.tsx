import React, { useEffect } from "react";
import * as mqtt from "mqtt";
import * as dotenv from "dotenv";
import Active from "./Active";

dotenv.config();

const HOST = "ws://xinming.ddns.net";

const App = () => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState<string[]>([]);

  useEffect(() => {
    const client = mqtt.connect(HOST, {
      username: "guest",
      password: process.env.SERVER_PASSWORD,
    });
    client.on("connect", () => setConnectionStatus(true));
    client.on("message", (topic, payload, packet) => {
      setMessages(messages.concat(payload.toString()));
    });
  }, []);

  return <Active />;
};

export default App;
