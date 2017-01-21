import React from "react";
import {storiesOf} from "@kadira/storybook";
import {Room} from "./";

storiesOf("SampleComponent", module)
    .add(
        "room",
        () => (
            <Room roomId={1} />
        )
    );