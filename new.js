const apiKey = 'IHEQIZJL1IFW6UZG'; 

let searchChart, gainersChart, losersChart;


async function fetchIntradayData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data["Time Series (5min)"]) throw new Error("API limit or symbol issue");

  const timeSeries = data["Time Series (5min)"];
  const labels = Object.keys(timeSeries).reverse();
  const prices = labels.map(time => parseFloat(timeSeries[time]["4. close"]));

  return { labels, prices };
}

function renderChart(canvasId, labels, data, label = "Price") {
  const ctx = document.getElementById(canvasId);

 
  if (canvasId === "search-chart" && searchChart) searchChart.destroy();
  if (canvasId === "gainers-chart" && gainersChart) gainersChart.destroy();
  if (canvasId === "losers-chart" && losersChart) losersChart.destroy();

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { beginAtZero: false }
      }
    }
  });

  if (canvasId === "search-chart") searchChart = chart;
  if (canvasId === "gainers-chart") gainersChart = chart;
  if (canvasId === "losers-chart") losersChart = chart;
}

document.getElementById("search-btn").addEventListener("click", async () => {
  const symbol = document.getElementById("stock-symbol").value.toUpperCase();

  if (!symbol) return alert("Please enter a stock symbol");

  try {
    const { labels, prices } = await fetchIntradayData(symbol);
    renderChart("search-chart", labels, prices, `${symbol} Price`);
  } catch (err) {
    console.error("Error fetching stock data:", err);

  
    const mockLabels = ['9:30', '9:35', '9:40', '9:45', '9:50', '9:55'];
    const mockPrices = [120, 122, 121, 123, 124, 122.5];
    renderChart("search-chart", mockLabels, mockPrices, `Mock Data (${symbol})`);

    alert("Failed to fetch real stock data. Showing mock data instead.");
  }
});

async function fetchTopGainersLosers() {


  const gainers = [
    { symbol: "AAPL", price: 175.2, change: "+2.5%" },
    { symbol: "MSFT", price: 325.7, change: "+1.8%" },
    { symbol: "GOOGL", price: 135.3, change: "+1.6%" }
  ];

  const losers = [
    { symbol: "TSLA", price: 250.1, change: "-2.3%" },
    { symbol: "NFLX", price: 435.8, change: "-1.9%" },
    { symbol: "AMD", price: 110.6, change: "-1.7%" }
  ];

  return { gainers, losers };
}

function updateTopStocksUI({ gainers, losers }) {
  const gainersTable = document.querySelector("#gainers-table tbody");
  const losersTable = document.querySelector("#losers-table tbody");

  gainersTable.innerHTML = "";
  losersTable.innerHTML = "";

  gainers.forEach(stock => {
    gainersTable.innerHTML += `
      <tr>
        <td>${stock.symbol}</td>
        <td>${stock.price}</td>
        <td>${stock.change}</td>
      </tr>`;
  });

  losers.forEach(stock => {
    losersTable.innerHTML += `
      <tr>
        <td>${stock.symbol}</td>
        <td>${stock.price}</td>
        <td>${stock.change}</td>
      </tr>`;
  });

  
  renderChart(
    "gainers-chart",
    gainers.map(s => s.symbol),
    gainers.map(s => s.price),
    "Top Gainers"
  );

  renderChart(
    "losers-chart",
    losers.map(s => s.symbol),
    losers.map(s => s.price),
    "Top Losers"
  );
}

async function init() {
  try {
    const topStocks = await fetchTopGainersLosers();
    updateTopStocksUI(topStocks);
  } catch (err) {
    console.error("Error loading top stocks:", err);
  }
}

init();

