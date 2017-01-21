import React from 'react'
import {configure,addDecorator} from "@kadira/storybook";
import {withKnobs} from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const reg = require.context("../src", true, /.stories.js$/);

function loadStories() {
  reg.keys().forEach(filename => reg(filename));
}

const materialUIDecorator = (story) =>
  <MuiThemeProvider>
    {story()}
  </MuiThemeProvider>;

addDecorator(withKnobs);
addDecorator(materialUIDecorator);


configure(loadStories, module);
