import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as mqtt from "mqtt";
import * as dotenv from "dotenv";

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
