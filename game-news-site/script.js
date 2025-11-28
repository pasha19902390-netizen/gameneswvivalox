const newsContainer = document.getElementById("news-container");

// Прокси для парсинга RSS (бесплатный)
const RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

const feeds = [
    "https://www.ign.com/rss.xml",
    "https://www.gamespot.com/feeds/game-news/",
    "https://www.pcgamer.com/rss/"
];

async function loadNews() {
    newsContainer.innerHTML = "<p>Загрузка новостей...</p>";

    let allNews = [];

    for (let url of feeds) {
        try {
            const res = await fetch(RSS_PROXY + encodeURIComponent(url));
            const data = await res.json();
            if (data.items) {
                allNews.push(...data.items);
            }
        } catch (e) {
            console.log("Ошибка загрузки RSS:", e);
        }
    }

    // сортировка по дате
    allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // вывод на страницу
    newsContainer.innerHTML = "";

    allNews.slice(0, 20).forEach(news => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-title">${news.title}</div>
            <div class="card-date">${new Date(news.pubDate).toLocaleString()}</div> 
            <a href="${news.link}" class="card-link" target="_blank">Читать далее</a>
        `;

        newsContainer.appendChild(card);
    });
}

loadNews();