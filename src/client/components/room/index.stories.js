import React from "react";
import {storiesOf} from "@kadira/storybook";
import {Room} from "./";

import {number,object} from "@kadira/storybook-addon-knobs";

storiesOf("SampleComponent", module)
    .add(
        "room",
        () => (
            <Room roomId={1} />
        )
    )