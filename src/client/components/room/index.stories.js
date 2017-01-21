import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {RoomView, Room} from "./";

storiesOf("SampleComponent", module)
    .add(
        "room",
        () => (
            <Room />
        )
    );