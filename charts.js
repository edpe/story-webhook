const Chart = require('chart.js');

const dataP = fetch('/stats/data.json').then(res => res.json());
const ooh_dataP = fetch('/ooh_stats/data.json').then(res => res.json());

(async function() {
  const result = await dataP;

  new Chart(document.getElementById('selected-chart'), {
    type: 'pie',
    data: {
      labels: [
        "Matthew's story",
        "Sarah's story",
        "Jean's story",
        "Morgan's story",
        "Liams's story"
      ],
      datasets: [
        {
          label: 'Most Selected',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D', '#BC0067'],
          data: result.map(story => story.selectedCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was chosen'
      },
      legend: {
        position: 'left'
      }
    }
  });

  new Chart(document.getElementById('completed-chart'), {
    type: 'pie',
    data: {
      labels: [
        "Matthew's story",
        "Sarah's story",
        "Jean's story",
        "Morgan's story",
        "Liams's story"
      ],
      datasets: [
        {
          label: 'Most Read',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D', '#BC0067'],
          data: result.map(story => story.readCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was completed'
      },
      legend: {
        position: 'left'
      }
    }
  });

  const sumArray = (accumulator, currentValue) => accumulator + currentValue;

  new Chart(document.getElementById('ratings-chart'), {
    type: 'horizontalBar',
    data: {
      labels: [
        "Matthew's story",
        "Sarah's story",
        "Jean's story",
        "Morgan's story",
        "Liams's story"
      ],
      datasets: [
        {
          label: 'Story Rating',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D', '#BC0067'],
          data: result.map(story => {
            if (!story.ratings.length) {
              return 0;
            } else {
              const ratingsSum = story.ratings.reduce(sumArray);
              const ratingsAvg = ratingsSum / story.ratings.length;
              return ratingsAvg;
            }
          })
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      legend: { display: false },
      title: {
        display: true,
        text: 'Average rating for each story'
      }
    }
  });
})();

(async function() {
  const result = await ooh_dataP;

  new Chart(document.getElementById('ooh_selected-chart'), {
    type: 'pie',
    data: {
      labels: [
        "Matthew's story",
        "Steve's story",
        "Jean's story",
        "Morgan's story"
      ],
      datasets: [
        {
          label: 'Most Selected',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D'],
          data: result.map(ooh_story => ooh_story.selectedCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was chosen'
      },
      legend: {
        position: 'left'
      }
    }
  });

  new Chart(document.getElementById('ooh_completed-chart'), {
    type: 'pie',
    data: {
      labels: [
        "Matthew's story",
        "Steve's story",
        "Jean's story",
        "Morgan's story"
      ],
      datasets: [
        {
          label: 'Most Read',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D'],
          data: result.map(ooh_story => ooh_story.readCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was completed'
      },
      legend: {
        position: 'left'
      }
    }
  });

  const ooh_sumArray = (accumulator, currentValue) =>
    accumulator + currentValue;

  new Chart(document.getElementById('ooh_ratings-chart'), {
    type: 'horizontalBar',
    data: {
      labels: [
        "Matthew's story",
        "Steve's story",
        "Jean's story",
        "Morgan's story"
      ],
      datasets: [
        {
          label: 'Story Rating',
          backgroundColor: ['#202666', '#FFE400', '#E74D1C', '#80398D'],
          data: result.map(ooh_story => {
            if (!ooh_story.ratings.length) {
              return 0;
            } else {
              const ratingsSum = ooh_story.ratings.reduce(ooh_sumArray);
              const ratingsAvg = ratingsSum / ooh_story.ratings.length;
              return ratingsAvg;
            }
          })
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      legend: { display: false },
      title: {
        display: true,
        text: 'Average rating for each story'
      }
    }
  });
})();
