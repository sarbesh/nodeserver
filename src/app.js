const abtesting = require("./utilities/abtesting");

const express = require("express"),
  app = express(),
  router = require("./api/route"),
  invest = require("./api/investment"),
  comments = require("./api/comments"),
  config = require("./config"),
  bodyParser = require("body-parser");
global.logger = require("./utilities/winston");


//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());

let abtesting_rules = [
  {
    endpoint: "regex1",
    method: "POST",
    host: "host-b",
    enable: "true",
    name: "testing_1",
    condition: {},
  },
  {
    endpoint: "/api/testing_api",
    method: "POST",
    host: "http://server_B:3001",
    enable: "true",
    name: "testing_2",
    condition: {
      AND: [
        {
          OR: [
            {
              source: "body",
              operation: "equals",
              value: "valu2",
              path: "object1.object2",
            },
            {
              source: "body",
              operation: "equals",
              value: "valu2",
              path: "object1.object3",
            },
          ],
        },
        {
          source: "body",
          operation: "equals",
          value: "ar2val2",
          path: "array1.[ALL].obj1.[ANY].obj2",
        },
      ],
    },
  },
  {
    endpoint: "regex3",
    method: "POST",
    host: "host-b",
    enable: "false",
    name: "testing_3",
    condition: {},
  },
];
if(config.enable_ab && config.enable_ab=="true"){
  console.log("ENABLE_AB: ",config.enable_ab);
  app.use(abtesting({ config: abtesting_rules }));
}

// routes
app.use((req, res, next) => {
  console.log(" request: ", req.url);
  res.header("content-type", "application/json");
  next();
});

app.use("/api", router);
app.use("/api/invest", invest);
app.use("/api/comments", comments);

module.exports = app;
