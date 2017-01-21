import React from "react";
import {storiesOf} from "@kadira/storybook";
import {LoginScreen} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("LoginScreen", module)
  .add(
    "login screen",
    () => (
      <h3>Dupka</h3>
    )
  );
