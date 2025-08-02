function getCSSVariable(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

const ctx = document.getElementById('my-chart').getContext('2d');

const myChart = new Chart(ctx, {
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
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");


  myChart.data.datasets[0].borderColor = getCSSVariable('--chart-line-color');
  myChart.options.plugins.legend.labels.color = getCSSVariable('--chart-text-color');
  myChart.options.scales.x.ticks.color = getCSSVariable('--chart-text-color');
  myChart.options.scales.y.ticks.color = getCSSVariable('--chart-text-color');
  myChart.update();
});
