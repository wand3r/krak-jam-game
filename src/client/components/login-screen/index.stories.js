import React from "react";
import {storiesOf} from "@kadira/storybook";
import {LoginScreen} from "./";

storiesOf("LoginScreenView", module)
  .add(
    "login screen",
    () => (
      <LoginScreen/>
    )
  );
