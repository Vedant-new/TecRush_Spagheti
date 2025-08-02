let myChart;

function createChart() {
  const isDark = document.body.classList.contains('dark-theme');

  const ctx = document.getElementById('my-chart').getContext('2d');
  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10:00', '10:05', '10:10', '10:15', '10:20'],
      datasets: [{
        label: 'Stock Price',
        data: [190, 192, 191, 193, 195],
        borderColor: 'teal',
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
            color: isDark ? 'white' : 'black'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDark ? 'white' : 'black'
          }
        },
        y: {
          ticks: {
            color: isDark ? 'white' : 'black'
          }
        }
      }
    }
  });
}

window.onload = function () {
  const themeToggle = document.getElementById("theme-toggle");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeToggle.textContent = document.body.classList.contains("dark-theme")
      ? "Light Mode"
      : "Dark Mode";

    createChart(); 
  });

  createChart(); 
};