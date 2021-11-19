/* eslint-disable react/no-children-prop */
import React from "react";
import { ClassifyingData, PredictingData } from "./data";
import { BasisCurve } from "react-svg-curve";

interface Props {
  classifier: ClassifyingData;
  predicter: PredictingData;
}

const Anime = ({ classifier, predicter }: Props) => {
  return (
    <div>
      <h3>
        <code children="<BasisCurve />" />
      </h3>
      <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
        <BasisCurve
          data={classifier.data.map((element, index) => [element, index * 100])}
        />
      </svg>
    </div>
  );
};

export default Anime;
