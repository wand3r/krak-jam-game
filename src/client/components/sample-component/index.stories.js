import React from "react";
import {storiesOf} from "@kadira/storybook";
import {SampleComponent} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("SampleComponent", module)
  .add(
    "sample story",
    () => (
      <SampleComponent
        pos={object("position", {x: 10, y: 20})}
        size={{width: number("width", 5), height: number("height", 20)}}
      />
    )
  )
  .add(
    "sample story 2",
    () => (
      <SampleComponent
        pos={object("position", {x: 10, y: 20})}
        size={{width: number("width", 50), height: number("height", 50)}}
      />
    )
  );
