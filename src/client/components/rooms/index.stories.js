import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {RoomsView} from "./";
import {number,object} from "@kadira/storybook-addon-knobs";

const _rooms = [
    {id: "1", name: "Room 1", desc: "Cześć", teams: {red: 1, blue: 2}},
    {id: "2", name: "Room 1", desc: "Cześć", teams: {red: 1, blue: 2}},
    {id: "3", name: "Room 1", desc: "Cześć", teams: {red: 1, blue: 2}},
    {id: "4", name: "Room 2", desc: "Nie wchodzić", teams: {red: 4, blue: 2}},
    {id: "5", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: {red: 3, blue: 8}},
    {id: "6", name: "Room 3", desc: "Elo, luz jak w hip-hopie", teams: {red: 3, blue: 8}},
];

storiesOf("SampleComponent", module)
  .add(
    "Rooms",
    () => (
      <RoomsView 
        rooms={_rooms} 
        joinRoom={action(`join room`)}
        createRoom={action(`create room`)}
      />
    )
  )