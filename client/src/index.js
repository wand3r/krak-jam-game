import React from "react";
import ReactDOM from "react-dom";
import {css} from "glamor";
import {Main} from "./main";

css.global("html, body", {height: "100%", margin: "0"});
css.global("#app", {display: "flex", minHeight: "100%", width: "100%"});

ReactDOM.render(<Main />, document.getElementById("app"));
