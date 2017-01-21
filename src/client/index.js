import React from "react";
import ReactDOM from "react-dom";
import {css} from "glamor";
import {Main} from "./components/main";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

css.global("html, body", {height: "100%", margin: "0"});
css.global("#app", {display: "flex", alignItems:'center', justifyContent:'center', minHeight: "100%", width: "100%"});
css.global("*", {boxSizing: "border-box"});

ReactDOM.render(
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>, 
  document.getElementById("app"));