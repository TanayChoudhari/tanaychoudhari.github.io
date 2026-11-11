const isArticlePage = window.location.pathname.includes("/blogs/");
const isBlogPage = window.location.pathname.endsWith("/blogs.html") || isArticlePage;
const siteRoot = isArticlePage ? "../" : "./";
const homeTarget = `${siteRoot}index.html#`;

document.querySelector("[data-site-header]").innerHTML = `
  <nav class="site-nav" id="main-nav" aria-label="Main navigation">
    <ul>
      <li><a href="${homeTarget}home" ${isBlogPage ? "" : 'class="active"'}><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 20H3V9.5l9-7 9 7z"/></svg></span><span>Home</span></a></li>
      <li><a href="${homeTarget}journey"><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4v16m0-14h14l-3 4 3 4H5"/></svg></span><span>Journey</span></a></li>
      <li><a href="${homeTarget}education"><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v5c3.5 2.7 8.5 2.7 12 0v-5M22 9v6"/></svg></span><span>Education</span></a></li>
      <li><a href="${homeTarget}languages"><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16M12 3v2m6 0c-.5 5.2-3.4 9-8 11m-2-6c2.8 3.2 6.4 5.6 11 7M5 20l5-11 5 11m-8-3h6"/></svg></span><span>Languages</span></a></li>
      <li><a href="${homeTarget}contact"><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m21 3-7 18-4-8-8-4zM10 13l6-6"/></svg></span><span>Contact</span></a></li>
      <li><a href="${siteRoot}blogs.html" ${isBlogPage ? 'class="active" aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h9"/></svg></span><span>Blogs</span></a></li>
    </ul>
  </nav>
`;

document.querySelector("[data-site-footer]").innerHTML = `
  <footer class="site-footer">
    <div class="section-wrap footer-grid">
      <div class="footer-social">
        <div>
          <p class="section-kicker">Tanay Choudhari</p>
          <p class="hero-description footer-intro">Building software with clarity, patience, and a product-first mindset.</p>
        </div>
        <div class="social-links" aria-label="Social links">
          <a class="icon-link" href="https://github.com/TanayChoudhari/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.99c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.68.92.68 1.86v2.58c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
          </a>
          <a class="icon-link" href="https://www.linkedin.com/in/tanay-choudhari/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.38-1.85c3.61 0 4.28 2.37 4.28 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56c0 .95.79 1.72 1.77 1.72h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z"/></svg>
          </a>
          <a class="icon-link" href="mailto:tanaychoudhari30@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8L4.5 7h15L12 13Zm-8 4.5 5.8-4.7 1.2 1 1.2-1 5.8 4.7V8.6l-7 5.6-7-5.6v8.9Z"/></svg>
          </a>
        </div>
        <button class="like-button" id="like-button" type="button" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3C19.54 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2Z"/></svg>
          <span id="like-count">0 Likes</span>
        </button>
      </div>
      <div class="footer-tech">
        <p>Built with <span>HTML5</span></p>
        <p>Styled with <span>CSS3</span></p>
        <p>Powered by <span>JavaScript</span></p>
      </div>
      <div class="footer-music">
        <iframe title="Spotify playlist" src="https://open.spotify.com/embed/playlist/6Ez4l6u0o7u1tqgpQXp3nf?si=NIzfHzB-T0WE0b-2MCvsQA&utm_source=whatsapp&pi=10Qj4j9aQ3yRz" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      </div>
    </div>
    <p class="copyright">Copyright © <span id="current-year"></span>. All rights reserved by <a href="https://github.com/TanayChoudhari/" target="_blank" rel="noopener noreferrer">Tanay Vaibhav Choudhari</a></p>
  </footer>
`;
