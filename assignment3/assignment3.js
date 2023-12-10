'use trict';

document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("query").value;

    if (query.trim() !== "") {
        fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error("Error fetching data:", error));
    }
});

function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const article = document.createElement("article");
        const name = document.createElement("h2");
        const link = document.createElement("a");
        const image = document.createElement("img");
        const summary = document.createElement("div");

        name.textContent = result.show.name;
        link.href = result.show.url;
        link.target = "_blank";
        link.textContent = "Link";

        image.src = result.show.image?.medium ?? 'https://via.placeholder.com/210x295?text=Not%20Found';
        image.alt = result.show.name;
        summary.innerHTML = result.show.summary;

        article.appendChild(name);
        article.appendChild(link);
        article.appendChild(image);
        article.appendChild(summary);

        resultsContainer.appendChild(article);
    });
}
