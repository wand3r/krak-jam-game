import React from "react";
import {storiesOf} from "@kadira/storybook";
import {Main} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("SampleComponent", module)
  .add(
    "main",
    () => (
      <Main />
    )
  )