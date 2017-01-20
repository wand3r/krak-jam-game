import React from "react";
import {storiesOf} from "@kadira/storybook";
import {Team} from "./";

storiesOf("SampleComponent", module)
    .add(
        "team",
        () => (
            <Team name="Red" players={[{name: 'Kama', id: 33}]} />
        )
    );