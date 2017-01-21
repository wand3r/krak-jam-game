import React from "react";
import ReactDOM from "react-dom";
import {css} from "glamor";
import {Main} from "./components/main";
import {subscribeToEvent} from "../lefrex-js/event-aggregator";
import {room} from "../shared/events/room";
import {createCreateRoomAction} from "../shared/actions/room";
import {processAction} from "../lefrex-js/action-processor";

css.global("html, body", {height: "100%", margin: "0"});
css.global("#app", {display: "flex", minHeight: "100%", width: "100%"});
css.global("*", {boxSizing: "border-box"});

ReactDOM.render(<Main />, document.getElementById("app"));

subscribeToEvent(room.roomCreatedEvent, (payload) => {
    console.log(payload);
});

setTimeout(()=>{
    processAction(createCreateRoomAction(Math.floor(Math.random()*999), `Room no ${Math.floor(Math.random()*10)}`, 'sample description'));
}, 5000);