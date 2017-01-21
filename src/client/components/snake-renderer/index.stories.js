import React from "react";
import {storiesOf} from "@kadira/storybook";
import {SnakeRenderer} from "./";
// import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("Renderer", module)
  .add(
    "snake-renderer",
    () => (
      <SnakeRenderer/>
      // <SnakeRenderer
      //   pos={object("position", {x: 10, y: 20})}
      //   size={{width: number("width", 5), height: number("height", 20)}}
      // />
    )
  );
