const Chart = require('chart.js');

const dataP = fetch('/stats/data.json').then(res => res.json());

(async function() {
  const result = await dataP;

  new Chart(document.getElementById('selected-chart'), {
    type: 'pie',
    data: {
      labels: ["Matthew's story", "Steve's story", 'story3'],
      datasets: [
        {
          label: 'Most Selected',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
          data: result.map(story => story.selectedCount)
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

  new Chart(document.getElementById('completed-chart'), {
    type: 'pie',
    data: {
      labels: ["Matthew's story", "Steve's story", 'story3'],
      datasets: [
        {
          label: 'Most Read',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
          data: result.map(story => story.readCount)
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of times each story was completed'
      }
    }
  });

  const sumArray = (accumulator, currentValue) => accumulator + currentValue;

  new Chart(document.getElementById('ratings-chart'), {
    type: 'horizontalBar',
    data: {
      labels: ["Matthew's story", "Steve's story", 'story3'],
      datasets: [
        {
          label: 'Story Rating',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
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
      legend: { display: false },
      title: {
        display: true,
        text: 'Average rating for each story'
      }
    }
  });
})();
