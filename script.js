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

    function displayArticle(title, subtitle, image, caption, author, content) {
      const el = document.getElementById('articleContent');
      el.style.display = 'block';
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      el.innerHTML = `
        <img src="${image}" alt="">
        <div class="caption">${caption}</div>
        <h3>${title}</h3>
        <h4>${subtitle}</h4>
        <p><em>By ${author}</em></p>
        ${content}
        <br><br>
        <a href="#" onclick="goHome(); return false;" style="color:#0a1a2f; font-weight:bold; text-decoration: underline;">Back to home page</a>
      `;
    }

    window.onload = () => {
      showSection('top');
      const navLinks = document.querySelectorAll('nav a');
      if (navLinks.length > 0) navLinks[0].classList.add('active-tab');
    }
