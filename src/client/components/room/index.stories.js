import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {Room} from "./";

storiesOf("SampleComponent", module)
    .add(
        "room",
        () => (
            <Room joinTeam={action('Join team')} roomId={10} />
        )
    );