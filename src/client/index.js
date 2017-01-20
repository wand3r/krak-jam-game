import React from "react";
import ReactDOM from "react-dom";
import {css} from "glamor";
import {Main} from "./components/main";
import {processAction} from "../lefrex-js/action-processor";
import sample from "../shared/actions/sample";

css.global("html, body", {height: "100%", margin: "0"});
css.global("#app", {display: "flex", minHeight: "100%", width: "100%"});

ReactDOM.render(<Main />, document.getElementById("app"));

setTimeout(()=>{
    processAction({
        $type: sample.medium
    }).then(x => {
        console.log(x);
    });
}, 5000);