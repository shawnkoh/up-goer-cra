import React, { useEffect, useRef } from "react";
import * as mqtt from "mqtt";
import * as dotenv from "dotenv";
import Active from "./Active";
import * as R from "ramda";
import { ClassifyingData, PredictingData, Prediction } from "./data";
import Two from "two.js";

dotenv.config();

const HOST = "ws://xinming.ddns.net:9001";
const PREDICT_TOPIC = "posture/predict";
const CLASSIFY_TOPIC = "posture/classify";

const App = () => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [predictingDatas, setPredictingDatas] = React.useState<
    PredictingData[]
  >([]);
  const [classifyingDatas, setClassifyingDatas] = React.useState<
    ClassifyingData[]
  >([]);
  const domElement = useRef<HTMLDivElement>();

  function setup() {
    const two = new Two({
      fullscreen: true,
      autostart: true,
    }).appendTo(domElement.current);

    const rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
    two.bind("update", update);

    return unmount;

    function unmount() {
      two.unbind("update");
      two.pause();
      if (domElement.current) {
        domElement.current.removeChild(two.renderer.domElement);
      }
    }

    function update() {
      rect.rotation += 0.001;
    }
  }

  useEffect(() => {
    const client = mqtt.connect(HOST, {
      username: "guest",
      password: "guest123",
      keepalive: 60,
    });
    client.on("connect", () => {
      console.log("connected");
      setConnectionStatus(true);
      client.subscribe(PREDICT_TOPIC, (err, granted) => {
        console.log(PREDICT_TOPIC);
        console.log(err);
        console.log(granted);
      });

      client.subscribe(CLASSIFY_TOPIC, (err, granted) => {
        console.log(CLASSIFY_TOPIC);
        console.log(err);
        console.log(granted);
      });
    });
    client.on("message", (topic, payload, packet) => {
      const json = JSON.parse(payload.toString());
      switch (topic) {
        case PREDICT_TOPIC:
          setPredictingDatas(predictingDatas.concat(json));
          break;
        case CLASSIFY_TOPIC:
          setClassifyingDatas(classifyingDatas.concat(json));
          break;
      }
    });
  }, []);

  return <Active />;
};

const Indicator: React.FC<PredictingData> = (data: PredictingData) => {
  return <>isGood(data)</>;
};

export default App;
