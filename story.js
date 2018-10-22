const connection = require('./connection');

const Schema = connection.Schema;

const storySchema = new Schema ({
  title: String,
  selectedCount: Number,
  readCount: Number,
  ratings: [Number]
})

const Story = connection.model('Story', storySchema);



module.exports = story;
