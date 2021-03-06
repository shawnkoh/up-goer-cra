import React, { useEffect, useRef } from "react";
import * as mqtt from "mqtt";
import * as dotenv from "dotenv";
import { ClassifyingData, PredictingData } from "./data";
import Two from "two.js";
import Card from "./Card";
import { PREDICT_TOPIC, CLASSIFY_TOPIC, HOST } from "./server";

dotenv.config();
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

  return <Card />;
};

export default App;
