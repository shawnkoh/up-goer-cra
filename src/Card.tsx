import React, { useEffect } from "react";
import { Prediction, PredictingData, ClassifyingData } from "./data";
import { CLASSIFY_TOPIC, connectToServer, PREDICT_TOPIC } from "./server";
import Active from "./Active";
import Anime from "./Anime";

export interface ProperCardProps {
  classifier: ClassifyingData;
  predicter: PredictingData;
}
export const ProperCard = ({ classifier, predicter }: ProperCardProps) => {
  return (
    <div className="flex h-80 p-8">
      {predicter.prediction == Prediction.GOOD ? (
        <div className="bg-green-500 shadow rounded-lg flex-grow">
          <div className="px-4 py-5 sm:p-6" />
        </div>
      ) : (
        <div className="bg-red-500 shadow rounded-lg flex-grow">
          <div className="px-4 py-5 sm:p-6" />
        </div>
      )}
    </div>
  );
};

export const Card: React.FC = () => {
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
    <div className="justify-center h-screen">
      {/* <div className="grid grid-flow-col auto-cols-max h-screen"> */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Take control of your posture.
            </p>
          </div>
        </div>
      </div>
      <ProperCard {...{ classifier, predicter }} />
      <div className="flex flex-grow mx-auto justify-center">
        <Anime {...{ classifier, predicter }} />
      </div>
    </div>
  ) : (
    <Active />
  );
};

export default Card;
