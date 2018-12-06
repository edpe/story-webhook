const StoryModel = require('./storyModel');

function seedStories() {
  const stories = [
    { title: 'story1', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'story2', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'story3', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'story4', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'story5', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'ooh_story1', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'ooh_story2', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'ooh_story3', selectedCount: '0', readCount: '0', ratings: [] },
    { title: 'ooh_story4', selectedCount: '0', readCount: '0', ratings: [] }
  ];
  for (story of stories) {
    var newStory = new StoryModel(story);
    newStory.save();
  }
}

function checkDb(count) {
  if (count === 0) {
    console.log('db empty');
    seedStories();
    console.log('db seeded');
  } else {
    console.log('db not empty');
  }
}

StoryModel.countDocuments({}, function(err, count) {
  checkDb(count), count;
});
