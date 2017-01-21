import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {RoomsView} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";
import {rooms} from '../../../data/rooms'

storiesOf("SampleComponent", module)
  .add(
    "Rooms",
    () => (
      <RoomsView 
        rooms={rooms} 
        joinRoom={action(`join room`)}
        createRoom={action(`create room`)}
      />
    )
  )