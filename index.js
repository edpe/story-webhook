"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json()); // creates http server
const token = process.env.TOKEN; // verification token
const port = process.env.PORT;

const sessions = {};

app.get("/", (req, res) => {
  // check if verification token is correct
  if (req.query.token !== token) {
    return res.sendStatus(401);
  }

  // return challenge,
  return res.end(req.query.challenge);
});

app.post("/", (req, res) => {
  // check if verification token is correct
  if (req.query.token !== token) {
    return res.sendStatus(401);
  }

  const result = req.body.result;
  const response = {
    sessionAttributes: { save: "me" },
    responses: [
      {
        type: "text",
        elements: ["ok", "thanks"]
      }
    ]
  };

  if (result.interaction.name.substring(0, 12) === "choose story") {
    switch (result.interaction.name) {
      case "choose story 1":
        console.log("choose story 1");
        break;
      case "choose story 2":
        console.log("choose story 2");
        break;
      case "choose story 3":
        console.log("choose story 3");
        break;
    }
  } else if (result.interaction.name.substring(0, 12) === "end of story") {
    switch (result.interaction.name) {
      case "end of story 1":
        console.log("increment story 1 completed count");
        break;
      case "end of story 2":
        console.log("increment story 2 completed count");
        break;
      case "end of story 3":
        console.log("increment story 3 completed count");
        break;
    }
  } else if (result.interaction.name.substring(0, 10) === "rate story") {
    switch (result.interaction.name) {
      case "rate story 1":
        console.log("add rating of " + result.resolvedQuery + " to story 1");
        break;
      case "rate story 2":
        console.log("add rating of " + result.resolvedQuery + " to story 2");
        break;
      case "rate story 2":
        console.log("add rating of " + result.resolvedQuery + " to story 3");
        break;
    }
  }

  return res.json(response);
});

app.listen(port, () => console.log("[BotEngine] Webhook is listening"));
