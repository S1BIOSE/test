const FEED_URL = `TokenFeed`;

fetch(FEED_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
      html += `
        <div class="card position-relative text-start text-dark mb-3 p-2">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <img class="rounded overflow-hidden" src="${el.querySelector("enclosure").getAttribute('url')}" alt="${el.querySelector("title").innerHTML}">
            </div>
            <div class="flex-grow-1 ms-3">
              <div class="h5">${el.querySelector("title").innerHTML}</div>
              <p class="mb-2">${el.querySelector("description").innerHTML}</p>
              <p class="mb-0"><small class="text-muted">${el.querySelector("pubDate").innerHTML}</small></p>
            </div>
          </div>
          <a href="${el.querySelector("link").innerHTML}" title="${el.querySelector("title").innerHTML}" class="stretched-link" target="_blank" rel="noopener noreferrer"></a>
        </div>
      `;
    });
    document.querySelector('#feed').insertAdjacentHTML("beforeend", html);
  });