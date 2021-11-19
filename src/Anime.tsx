import React from "react";
import { ClassifyingData, PredictingData } from "./data";
import { useEffect } from "react";
import RuneJS from "rune.js";

const Rune = (props) => {
  const { container = "#canvas", draw, height, width, onUpdate, play } = props;

  useEffect(() => {
    const rune = new RuneJS({
      container,
      height,
      width,
    });

    // document.get;
    // window.RUNE = rune;

    draw(rune);

    if (onUpdate) {
      rune.on("update", onUpdate);
    }

    if (play) {
      rune.play();
    } else {
      rune.draw();
    }

    return () => {
      // Remove the svg from the DOM
      console.log("Rune unmount");

      rune.el.remove();
    };
  }, [draw]);

  return null;
};

interface Props {
  classifier: ClassifyingData;
  predicter: PredictingData;
}

const Anime = ({ classifier, predicter }: Props) => {
  const draw = (rune) => {
    // classifier.data.forEach();
    // rune.line();
    rune.path(0, 0).curveTo(100, 100).curveTo(200, 300).stroke(0, 0, 255);
  };

  return (
    <>
      <div id="canvas">
        <Rune height={800} width={800} draw={draw} />
      </div>
    </>
  );
};

export default Anime;
