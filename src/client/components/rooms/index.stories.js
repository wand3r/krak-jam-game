import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {Rooms} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("SampleComponent", module)
  .add(
    "Rooms",
    () => (
      <Rooms openRoom={action(`open room`)}/>
    )
  )