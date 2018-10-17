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

  // return challenge
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
    switch (result.resolvedQuery) {
      case "read story 1":
        console.log("story 1 chosen");
        break;
      case "read story 2":
        console.log("story 2 chosen");
        break;
      case "read story 3":
        console.log("story 3 chosen");
        break;
    }
  } else if (result.interaction.name.substring === "end of story") {
    switch(result.interaction.name) {
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

  }
  return res.json(response);
});

app.listen(port, () => console.log("[BotEngine] Webhook is listening"));
