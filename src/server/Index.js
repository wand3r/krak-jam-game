import {User} from "./TestNamespace/User";

const _constantUser = new User();
let _letUser = new User();

const _mapWithArrow = [_constantUser, _letUser].map(
  (user, id) => ({id, ...user})
);

console.log(_mapWithArrow);

import express from "express";
var app = express();

app.get("/", function(req, res) {
  res.send("Hello Worlasd asdfasd!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 300!");
});
