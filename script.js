function activateTab(tabElement, sectionId) {
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active-tab'));
  tabElement.classList.add('active-tab');
  showSection(sectionId);
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById(id);
  if (section) section.classList.add('active');
  const articleView = document.getElementById('articleContent');
  if (articleView) articleView.style.display = 'none';
}

function goHome() {
  showSection('top');
}

function displayArticleFromJSON(article) {
  const el = document.getElementById('articleContent');
  el.style.display = 'block';
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  const paragraphs = article.content.map(p => `<p>${p}</p>`).join("");

  el.innerHTML = `
    <img src="${article.image}" alt="">
    <div class="caption">${article.caption}</div>
    <h3>${article.title}</h3>
    <h4>${article.subtitle}</h4>
    <p><em>By ${article.author}</em></p>
    ${paragraphs}
    <br><br>
    <a href="#" onclick="goHome(); return false;" style="color:#0a1a2f; font-weight:bold; text-decoration: underline;">Back to home page</a>
  `;
}

async function loadArticles() {
  const res = await fetch('articles.json');
  const articles = await res.json();

  const sectionMap = {
    "top stories": document.getElementById("top"),
    "global affairs": document.getElementById("global"),
    "politics": document.getElementById("politics"),
    "finance": document.getElementById("finance"),
    "culture": document.getElementById("culture"),
    "technology": document.getElementById("technology")
  };

  articles.forEach(article => {
  const articleHTML = document.createElement('article');
  articleHTML.className = "article-box";
  articleHTML.onclick = () => displayArticleFromJSON(article); // ✅ Click anywhere to open

  articleHTML.innerHTML = `
    <img src="${article.image}" loading="lazy" alt="Article thumbnail">
    <strong>${article.title}</strong>
    <div class="article-tags">Tags: ${article.tags.join(', ')}</div>
    <a href="#" style="color:#0a1a2f; text-decoration: underline;">View</a>
  `;

  const primaryTag = article.tags.find(tag =>
    Object.keys(sectionMap).includes(tag.toLowerCase())
  ) || "top stories";

  const section = sectionMap[primaryTag.toLowerCase()];
  const grid = section.querySelector('.article-grid');
  grid.appendChild(articleHTML);
});
}

window.onload = () => {
  showSection('top');
  loadArticles();
  const navLinks = document.querySelectorAll('nav a');
  if (navLinks.length > 0) navLinks[0].classList.add('active-tab');
};
