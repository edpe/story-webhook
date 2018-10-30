class Library {
  constructor(storyModel) {
    this.storyModel = storyModel;
  }

  logStoryChoice(story) {
    this.storyModel.findOneAndUpdate(
      { title: story },
      { $inc: { selectedCount: 1 } },
      { new: true },
      function(err, response) {
        if (err) {
          console.log('error', err);
        } else {
          console.log('response', response);
        }
      }
    );
  }

  logStoryCompleted(story) {
    this.storyModel.findOneAndUpdate(
      { title: story },
      { $inc: { readCount: 1 } },
      { new: true },
      function(err, response) {
        if (err) {
          console.log('error', err);
        } else {
          console.log('response', response);
        }
      }
    );
  }

  addStoryRating(story, rating) {
    console.log(story, rating);
    this.storyModel.findOneAndUpdate(
      { title: story },
      { $push: { ratings: rating } },
      { new: true },
      function(err, response) {
        if (err) {
          console.log('error', err);
        } else {
          console.log('response', response);
        }
      }
    );
  }

  getStoryData(story, findCount) {
    return this.storyModel.findOne({ title: story }).exec();
  }

}

module.exports = Library;
