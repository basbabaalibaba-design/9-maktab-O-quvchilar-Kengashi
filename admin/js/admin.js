const adminCredentials = {
  username: 'admin',
  password: 'kelajak2026'
};

const defaultData = {
  leader: { name: 'Murodova Shaxnoza', role: 'Kelajak lideri' },
  stats: [
    '8 ta koordinatsiya yoʻnalishi',
    '5–11-sinflar vakillari',
    'Yillik faoliyat va tadbirlar'
  ],
  contact: {
    school: '9-maktab',
    phone: '+998 90 123 45 67',
    email: 'kengash@school.uz',
    address: 'Toshkent shahri'
  },
  news: [
    {
      title: 'Yosh liderlar forumi',
      date: '25-sentabr 2026',
      description: 'Oʻquvchilar Kengashi rahbariyati yangi mavzu doirasida yosh liderlar bilan tanishdi.'
    }
  ]
};

function getSiteData() {
  const saved = localStorage.getItem('kengashSiteData');
  return saved ? JSON.parse(saved) : defaultData;
}

function saveSiteData(data) {
  localStorage.setItem('kengashSiteData', JSON.stringify(data));
}

function isLoggedIn() {
  return localStorage.getItem('kengashAdminLoggedIn') === 'true';
}

function setLoggedIn(value) {
  localStorage.setItem('kengashAdminLoggedIn', String(value));
}

function fillDashboardForm() {
  const data = getSiteData();

  const schoolName = document.getElementById('schoolName');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const address = document.getElementById('address');
  const leaderName = document.getElementById('leaderName');
  const leaderRole = document.getElementById('leaderRole');

  if (schoolName) schoolName.value = data.contact?.school || defaultData.contact.school;
  if (phone) phone.value = data.contact?.phone || defaultData.contact.phone;
  if (email) email.value = data.contact?.email || defaultData.contact.email;
  if (address) address.value = data.contact?.address || defaultData.contact.address;

  if (leaderName) leaderName.value = data.leader?.name || defaultData.leader.name;
  if (leaderRole) leaderRole.value = data.leader?.role || defaultData.leader.role;
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const message = document.getElementById('loginMessage');

  if (username === adminCredentials.username && password === adminCredentials.password) {
    setLoggedIn(true);
    window.location.href = 'dashboard.html';
    return;
  }

  if (message) {
    message.textContent = 'Notoʻgʻri foydalanuvchi nomi yoki parol.';
    message.style.color = '#d9534f';
  }
}

function handleLogout() {
  setLoggedIn(false);
  window.location.href = 'index.html';
}

function handleGeneralForm(event) {
  event.preventDefault();

  const data = getSiteData();
  data.contact = {
    school: document.getElementById('schoolName').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value
  };

  saveSiteData(data);
  alert('Umumiy ma’lumotlar saqlandi.');
}

function handleLeaderForm(event) {
  event.preventDefault();

  const data = getSiteData();
  data.leader = {
    name: document.getElementById('leaderName').value,
    role: document.getElementById('leaderRole').value
  };

  saveSiteData(data);
  alert('Rahbariyat ma’lumotlari saqlandi.');
}

function handleNewsForm(event) {
  event.preventDefault();

  const data = getSiteData();
  const title = document.getElementById('newsTitle').value.trim();
  const date = document.getElementById('newsDate').value.trim();
  const description = document.getElementById('newsText').value.trim();

  if (!title || !date || !description) {
    alert('Barcha maydonlarni toʻldiring.');
    return;
  }

  data.news = [
    { title, date, description },
    ...(data.news || [])
  ];

  saveSiteData(data);
  alert('Yangilik qo‘shildi.');
  document.getElementById('newsForm').reset();
}

function setupLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', handleLogin);
}

function setupDashboardPage() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  fillDashboardForm();

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const generalForm = document.getElementById('generalForm');
  if (generalForm) generalForm.addEventListener('submit', handleGeneralForm);

  const leaderForm = document.getElementById('leaderForm');
  if (leaderForm) leaderForm.addEventListener('submit', handleLeaderForm);

  const newsForm = document.getElementById('newsForm');
  if (newsForm) newsForm.addEventListener('submit', handleNewsForm);
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('/dashboard.html') || window.location.pathname.includes('dashboard.html')) {
    setupDashboardPage();
    return;
  }

  setupLoginPage();
});
