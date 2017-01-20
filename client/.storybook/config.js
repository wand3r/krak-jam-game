import {configure,addDecorator} from "@kadira/storybook";
import {withKnobs} from "@kadira/storybook-addon-knobs";

const reg = require.context("../src", true, /.stories.js$/);

function loadStories() {
  reg.keys().forEach(filename => reg(filename));
}

addDecorator(withKnobs);

configure(loadStories, module);
