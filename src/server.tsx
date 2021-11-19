import * as mqtt from "mqtt";

const HOST = "ws://xinming.ddns.net:9001";
export const PREDICT_TOPIC = "posture/predict";
export const CLASSIFY_TOPIC = "posture/classify";

export const connectToServer = () => {
  return mqtt.connect(HOST, {
    username: "guest",
    password: "guest123",
    keepalive: 60,
  });
};
