import React, { useEffect } from "react";
import { Prediction, PredictingData, ClassifyingData } from "./data";
import * as mqtt from "mqtt";
import { CLASSIFY_TOPIC, connectToServer, PREDICT_TOPIC } from "./server";
import Active from "./Active";

export interface ProperCardProps {
  classifier: ClassifyingData;
  predicter: PredictingData;
}
export const ProperCard = ({ classifier, predicter }: ProperCardProps) => {
  return (
    <div className="bg-blue-500 flex h-screen">
      {predicter.prediction == Prediction.GOOD ? (
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

const Card: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [predicter, setPredicter] = React.useState<PredictingData | null>(null);
  const [classifier, setClassifier] = React.useState<ClassifyingData | null>(
    null
  );

  useEffect(() => {
    const client = connectToServer();

    client.on("connect", () => {
      console.log("connected");
      setConnectionStatus(true);
      client.subscribe(CLASSIFY_TOPIC, (err, granted) => {
        console.log(CLASSIFY_TOPIC);
        console.log(err);
        console.log(granted);
      });

      client.subscribe(PREDICT_TOPIC, (err, granted) => {
        console.log(PREDICT_TOPIC);
        console.log(err);
        console.log(granted);
      });
    });
    client.on("message", (topic, payload, packet) => {
      switch (topic) {
        case PREDICT_TOPIC: {
          const predicter: PredictingData = JSON.parse(payload.toString());
          setPredicter(predicter);
          break;
        }
        case CLASSIFY_TOPIC: {
          const classifier: ClassifyingData = JSON.parse(payload.toString());
          setClassifier(classifier);
          break;
        }
      }
    });
  }, []);

  return !!classifier && !!predicter ? (
    <ProperCard {...{ classifier, predicter }} />
  ) : (
    <Active />
  );
};

export default Card;
