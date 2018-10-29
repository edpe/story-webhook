const Chart = require('chart.js');

const dataP = fetch('/stats/data.json').then(res => res.json());

(async function() {
  new Chart(document.getElementById('story-selected-chart'), {
    type: 'pie',
    data: {
      labels: ['story1', 'story2', 'story3'],
      datasets: [
        {
          label: 'Most read',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
          data: (await dataP).map(story => story.selectedCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was chosen'
      }
    }
  });
})();

new Chart(document.getElementById('story-completed-chart'), {
  type: 'pie',
  data: {
    labels: ['Africa', 'Asia', 'dgdg', 'Latin America', 'North America'],
    datasets: [
      {
        label: 'Population (millions)',
        backgroundColor: [
          '#3e95cd',
          '#8e5ea2',
          '#3cba9f',
          '#e8c3b9',
          '#c45850'
        ],
        data: [2478, 5267, 734, 784, 433]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});
