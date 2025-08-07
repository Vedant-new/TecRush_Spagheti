function getCSSVariable(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

window.addEventListener('DOMContentLoaded', function () {
  // Only create the chart if the element exists
  const canvas = document.getElementById('my-chart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
        datasets: [{
          label: 'Stock Price',
          data: [190, 192, 191, 193, 195],
          borderColor: getCSSVariable('--chart-line-color'),
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: getCSSVariable('--chart-text-color')
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: getCSSVariable('--chart-text-color')
            }
          },
          y: {
            ticks: {
              color: getCSSVariable('--chart-text-color')
            }
          }
        }
      }
    });
  }

  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      // Update chart colors if the chart exists
      if (window.myChart) {
        window.myChart.data.datasets[0].borderColor = getCSSVariable('--chart-line-color');
        window.myChart.options.plugins.legend.labels.color = getCSSVariable('--chart-text-color');
        window.myChart.options.scales.x.ticks.color = getCSSVariable('--chart-text-color');
        window.myChart.options.scales.y.ticks.color = getCSSVariable('--chart-text-color');
        window.myChart.update();
      }
    });
  }
});
