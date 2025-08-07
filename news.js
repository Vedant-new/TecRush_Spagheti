async function fetchMarketAuxNews() {
  const newsContainer = document.getElementById('news-list');
  const apiKey = 'ogrOTn817V35sEqdxaTIMygHWYqFu9nrhW7EkkH3'; // <-- Replace this
  const url = `https://api.marketaux.com/v1/news/all?symbols=AAPL,TSLA,GOOGL&filter_entities=true&language=en&api_token=${apiKey}`;

  try {
    newsContainer.innerHTML = '<p>Loading news...</p>';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch news');

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      newsContainer.innerHTML = '<p>No news found.</p>';
      return;
    }

    newsContainer.innerHTML = '';

    data.data.slice(0, 8).forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.innerHTML = `
        ${article.image_url ? `<img src="${article.image_url}" alt="News Image">` : ''}
        <div class="news-content">
          <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
          <p class="meta">${article.source} • ${new Date(article.published_at).toLocaleDateString()}</p>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    newsContainer.innerHTML = `<p>Error loading news: ${err.message}</p>`;
  }
}

// Run it on page load
document.addEventListener('DOMContentLoaded', fetchMarketAuxNews);
