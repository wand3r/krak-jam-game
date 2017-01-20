import React from "react";
import {css} from "glamor";

export const add = (x, y) => {
  return x + y;
};

export const SampleComponent = ({size, pos}) => (
  <div>
    <div
      {...css({
        position: "relative",
        ...size,
        top: pos.y,
        left: pos.x,
        background: "blue"
      })}
    >
    </div>
  </div>
);
