/* admin.js — simple CRUD with localStorage fallback and optional Firebase support */

(async function () {
  // load site data
  async function loadLocalSite() {
    try {
      const res = await fetch('/data/site.json');
      if (res.ok) return res.json();
    } catch (e) {}
    const saved = localStorage.getItem('kengashSiteData');
    return saved ? JSON.parse(saved) : null;
  }

  let site = await loadLocalSite();
  if (!site) site = { news: [], leadership: [], activities: [], contact: {} };

  // DOM
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const authMsg = document.getElementById('authMsg');
  const editor = document.getElementById('editor');

  // News elements
  const newsTitle = document.getElementById('newsTitle');
  const newsDate = document.getElementById('newsDate');
  const newsDesc = document.getElementById('newsDesc');
  const addNews = document.getElementById('addNews');
  const newsListAdmin = document.getElementById('newsListAdmin');

  const leaderRole = document.getElementById('leaderRole');
  const leaderName = document.getElementById('leaderName');
  const leaderDesc = document.getElementById('leaderDesc');
  const addLeader = document.getElementById('addLeader');
  const leadListAdmin = document.getElementById('leadListAdmin');

  const saveAll = document.getElementById('saveAll');

  function renderNewsAdmin() {
    newsListAdmin.innerHTML = '';
    (site.news || []).forEach((n, idx) => {
      const art = document.createElement('article');
      art.innerHTML = `
        <strong>${n.title}</strong>
        <div class="muted">${n.date}</div>
        <p>${n.description}</p>
        <div class="admin-controls">
          <button data-idx="${idx}" class="edit">Tahrirlash</button>
          <button data-idx="${idx}" class="del">O'chirish</button>
        </div>
      `;
      newsListAdmin.appendChild(art);
    });
  }

  function renderLeadersAdmin() {
    leadListAdmin.innerHTML = '';
    (site.leadership || []).forEach((n, idx) => {
      const art = document.createElement('article');
      art.innerHTML = `
        <span class="role-tag">${n.role}</span>
        <strong>${n.name}</strong>
        <p>${n.desc}</p>
        <div class="admin-controls">
          <button data-idx="${idx}" class="edit">Tahrirlash</button>
          <button data-idx="${idx}" class="del">O'chirish</button>
        </div>
      `;
      leadListAdmin.appendChild(art);
    });
  }

  // CRUD
  addNews.addEventListener('click', () => {
    const item = { title: newsTitle.value || 'Sarlavha', date: newsDate.value || new Date().toLocaleDateString(), description: newsDesc.value || '' };
    site.news = site.news || [];
    site.news.unshift(item);
    renderNewsAdmin();
    newsTitle.value = newsDate.value = newsDesc.value = '';
  });

  addLeader.addEventListener('click', () => {
    const item = { role: leaderRole.value || 'Lavozim', name: leaderName.value || 'Ism', desc: leaderDesc.value || '' };
    site.leadership = site.leadership || [];
    site.leadership.unshift(item);
    renderLeadersAdmin();
    leaderRole.value = leaderName.value = leaderDesc.value = '';
  });

  newsListAdmin.addEventListener('click', (e) => {
    if (e.target.matches('button.del')) {
      const idx = Number(e.target.dataset.idx);
      site.news.splice(idx, 1);
      renderNewsAdmin();
    }
    if (e.target.matches('button.edit')) {
      const idx = Number(e.target.dataset.idx);
      const n = site.news[idx];
      newsTitle.value = n.title; newsDate.value = n.date; newsDesc.value = n.description;
      site.news.splice(idx,1);
      renderNewsAdmin();
    }
  });

  leadListAdmin.addEventListener('click', (e) => {
    if (e.target.matches('button.del')) {
      const idx = Number(e.target.dataset.idx);
      site.leadership.splice(idx, 1);
      renderLeadersAdmin();
    }
    if (e.target.matches('button.edit')) {
      const idx = Number(e.target.dataset.idx);
      const n = site.leadership[idx];
      leaderRole.value = n.role; leaderName.value = n.name; leaderDesc.value = n.desc;
      site.leadership.splice(idx,1);
      renderLeadersAdmin();
    }
  });

  saveAll.addEventListener('click', async () => {
    // save locally
    localStorage.setItem('kengashSiteData', JSON.stringify(site));

    // if firebase configured, try to save to firestore
    if (window.firebase && window.firebaseConfig) {
      try {
        if (!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
        const db = firebase.firestore();
        await db.collection('site').doc('content').set(site);
        alert('Saqlandi: localStorage va Firestore');
        return;
      } catch (e) {
        console.error(e);
        alert('Localga saqlandi, Firestore-ga yozishda xatolik.');
        return;
      }
    }
    alert('Sayt ma\'lumotlari localStorage-ga saqlandi (demo).');
  });

  // simple auth: if firebase present and config, use firebase auth, else basic local password
  function showEditor() { editor.hidden = false; }
  function hideEditor() { editor.hidden = true; }

  logoutBtn.addEventListener('click', () => {
    if (window.firebase && window.firebase.auth && firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
    localStorage.removeItem('kengash_admin_auth');
    authMsg.textContent = 'Chiqdingiz';
    logoutBtn.hidden = true;
    loginBtn.hidden = false;
    hideEditor();
  });

  loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (window.firebase && window.firebaseConfig && window.firebase.auth) {
      // use firebase auth
      try {
        if (!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        authMsg.textContent = 'Kirish muvaffaqiyatli';
        logoutBtn.hidden = false;
        loginBtn.hidden = true;
        showEditor();
      } catch (e) {
        authMsg.textContent = 'Kirish xatosi: ' + e.message;
      }
      return;
    }

    // fallback: a single password 'admin' (demo only)
    if (pass === 'admin') {
      localStorage.setItem('kengash_admin_auth', 'true');
      authMsg.textContent = 'Demo rejimida kirdingiz';
      logoutBtn.hidden = false;
      loginBtn.hidden = true;
      showEditor();
    } else {
      authMsg.textContent = 'Parol xato. Demo parol: admin';
    }
  });

  // initialize admin view
  (function init() {
    renderNewsAdmin();
    renderLeadersAdmin();
    const authed = (window.firebase && window.firebase.auth && firebase.auth().currentUser) || localStorage.getItem('kengash_admin_auth');
    if (authed) {
      authMsg.textContent = 'Allaqachon tizimdasiz';
      logoutBtn.hidden = false;
      loginBtn.hidden = true;
      showEditor();
    }
  })();
})();
