const connection = require('./connection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: String,
  selectedCount: Number,
  readCount: Number,
  ratings: [Number]
});

const storyModel = connection.model('Story', storySchema);



module.exports = storyModel;
