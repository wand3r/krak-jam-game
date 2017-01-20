import {User, foo} from "./TestNamespace/User";

const _constantUser = new User();
let _letUser = new User();

const _mapWithArrow = [_constantUser, _letUser].map(
  (user, id) => ({id, ...user})
);

import express from "express";
var app = express();

app.get("/", function(req, res) {
  res.send(`${foo} + Hellooooooooooooo--- + ${foo}`);
});

app.listen(3000, function() {
  console.log("Server listening....");
});
