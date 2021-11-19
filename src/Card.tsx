import React, { useEffect } from "react";
import { Prediction, PredictingData } from "./data";
import * as mqtt from "mqtt";

const Card: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [prediction, setPrediction] = React.useState<Prediction>(
    Prediction.BAD
  );

  prediction == Prediction.BAD;
  useEffect(() => {
    const client = connectToServer();

    client.on("connect", () => {
      console.log("connected");
      setConnectionStatus(true);
      client.subscribe(PREDICT_TOPIC, (err, granted) => {
        console.log(PREDICT_TOPIC);
        console.log(err);
        console.log(granted);
      });
    });
    client.on("message", (topic, payload, packet) => {
      const json: PredictingData = JSON.parse(payload.toString());
      setPrediction(json.prediction);
      console.log(json.prediction);
    });
  }, []);

  return (
    <div className="bg-blue-500 flex h-screen">
      {prediction == Prediction.GOOD ? (
        <div className="bg-green-500 shadow rounded-lg flex-grow">
          <div className="px-4 py-5 sm:p-6">good</div>
        </div>
      ) : (
        <div className="bg-red-500 shadow rounded-lg flex-grow">
          <div className="px-4 py-5 sm:p-6">bad</div>
        </div>
      )}
    </div>
  );
};

export default Card;
