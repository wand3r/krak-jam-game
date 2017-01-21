import React from "react";
import ReactDOM from "react-dom";
import {css} from "glamor";
import {Main} from "./components/main";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

css.global("html, body", {overflowY: 'scroll', height: "100%", margin: "0", backgroundSize: 'contain', backgroundImage:'url("https://farm3.staticflickr.com/2831/12657603295_fd3954a882_b.jpg")'});
css.global("#app", {display: "flex", alignItems:'center', justifyContent:'center', minHeight: "100%", width: "100%"});
css.global("*", {boxSizing: "border-box"});

ReactDOM.render(
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>, 
  document.getElementById("app"));