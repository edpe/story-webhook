'use strict';
require('dotenv').config();
const browserify = require('browserify-middleware');
const Library = require('./library');
const StoryModel = require('./storyModel');
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates http server
const token = process.env.TOKEN; // verification token
const port = process.env.PORT;
const ratings = {
  'Really helpful': 5,
  'It helped a bit': 4,
  'It was ok': 3,
  'Not much': 2,
  'Not at all': 1
};

const sessions = {};

const library = new Library(StoryModel);

app.get('/js/charts.js', browserify(__dirname + '/charts.js'));

app.use('/admin', express.static('client'));

app.get('/stats/data.json', async (req, res, next) => {
  const story1P = library.getStoryData('story1');
  const story2P = library.getStoryData('story2');
  const story3P = library.getStoryData('story3');

  let stories;
  try {
    stories = await Promise.all([story1P, story2P, story3P]);
  } catch(e) {
    next(e);

    return e;
  }

  res.json(stories);
});

app.get('/', (req, res) => {
  // check if verification token is correct
  if (req.query.token !== token) {
    return res.sendStatus(401);
  }

  return res.end(req.query.challenge);
});

app.post('/', (req, res) => {
  // check if verification token is correct
  if (req.query.token !== token) {
    return res.sendStatus(401);
  }

  const result = req.body.result;
  const response = {
    sessionAttributes: { save: 'me' },
    responses: [
      {
        type: 'text',
        elements: ['']
      }
    ]
  };

  if (result.interaction.name.substring(0, 12) === 'choose story') {
    switch (result.interaction.name) {
      case 'choose story1':
        library.logStoryChoice(result.interaction.name.substring(7, 13));
        break;
      case 'choose story2':
        library.logStoryChoice(result.interaction.name.substring(7, 13));
        break;
      case 'choose story3':
        library.logStoryChoice(result.interaction.name.substring(7, 13));
        break;
    }
  } else if (result.interaction.name.substring(0, 12) === 'end of story') {
    switch (result.interaction.name) {
      case 'end of story1':
        library.logStoryCompleted(result.interaction.name.substring(7, 13));
        break;
      case 'end of story2':
        library.logStoryCompleted(result.interaction.name.substring(7, 13));
        break;
      case 'end of story3':
        library.logStoryCompleted(result.interaction.name.substring(7, 13));
        break;
    }
  } else if (result.interaction.name.substring(0, 10) === 'rate story') {
    switch (result.interaction.name) {
      case 'rate story1':
        console.log('resolved query', result.resolvedQuery);
        library.addStoryRating(
          result.interaction.name.substring(5, 11),
          ratings[result.resolvedQuery]
        );
        break;
      case 'rate story2':
        console.log('resolved query', result.resolvedQuery);
        library.addStoryRating(
          result.interaction.name.substring(5, 11),
          ratings[result.resolvedQuery]
        );
        break;
      case 'rate story3':
        library.addStoryRating(
          result.interaction.name.substring(5, 11),
          ratings[result.resolvedQuery]
        );
        break;
    }
  }

  return res.json(response);
});

app.listen(port, () => console.log('[BotEngine] Webhook is listening'));
