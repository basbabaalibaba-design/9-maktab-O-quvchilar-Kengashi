const defaultData = {
  stats: [
    '8 ta koordinatsiya yoʻnalishi',
    '5–11-sinflar vakillari',
    'Yillik faoliyat va tadbirlar'
  ],
  leader: {
    name: 'Murodova Shaxnoza',
    role: 'Kelajak lideri'
  },
  leadership: [
    {
      role: 'Kelajak lideri',
      name: 'Murodova Shaxnoza',
      desc: 'Jamoa faoliyatini muvofiqlashtirish va tadbirlar rejasini ishlab chiqish.'
    },
    {
      role: 'Ta’lim koordinatori',
      name: 'Abdullayev Dilshod',
      desc: 'Ta’lim sifatini oshirish, bilim yutug’lari va sinf vakillarini qo’llab-quvvatlash.'
    },
    {
      role: 'Madaniyat koordinatori',
      name: 'Nazarova Nilufar',
      desc: 'Milliy an’analar va madaniy tadbirlarni targʻib qilish, ijodiy loyihalarni rivojlantirish.'
    },
    {
      role: 'Media koordinatori',
      name: 'Raximov Jamshid',
      desc: 'Yangiliklar, matbuot va ijtimoiy muloqot maydonini rivojlantirish.'
    },
    {
      role: 'Sport koordinatori',
      name: 'Sattorov Temur',
      desc: 'Sport va sogʻlom turmush tarzini targʻib qilish, musobaqalarni tashkil etish.'
    },
    {
      role: 'Ijtimoiy tashabbus koordinatori',
      name: 'Qosimova Sevinch',
      desc: 'Foydali loyihalar, ijtimoiy tashabbuslar va jamoatchilik faoliyati.'
    }
  ],
  activities: [
    {
      title: 'Loyihalar va tashabbuslar',
      description: 'Oʻquvchilar tashabbuslarini qoʻllab-quvvatlash va jamoa manfaatlariga xizmat qiladigan loyihalarni yoʻlga qoʻyish.'
    },
    {
      title: 'Madaniy tadbirlar',
      description: 'Milliy bayramlar, maʼnaviy tadbirlar, teatrlashtirish va ijodiy festivallarni tashkil etish.'
    },
    {
      title: 'Sport va salomatlik',
      description: 'Sogʻlom turmush tarzini targʻib qilish, sport musobaqalari, harakat va faoliyatlar.'
    }
  ],
  news: [
    {
      title: 'Yosh liderlar forumi',
      date: '25-sentabr 2026',
      description: 'Oʻquvchilar Kengashi rahbariyati yangi mavzu doirasida yosh liderlar bilan tanishdi.'
    },
    {
      title: 'Ekologiya kuni',
      date: '10-oktabr 2026',
      description: 'Maktab hududida ekologik tadbir, yongʻin xavfsizligi va chiqindilarni ajratish aksiyasi.'
    },
    {
      title: 'Kengash yigʻilishi',
      date: '18-oktabr 2026',
      description: 'Yillik reja, loyiha bo’yicha fikrlar va takliflar muhokama qilindi.'
    }
  ],
  contact: {
    school: '9-maktab',
    phone: '+998 90 123 45 67',
    email: 'kengash@school.uz',
    address: 'Toshkent shahri'
  }
};

function getSiteData() {
  try {
    const saved = localStorage.getItem('kengashSiteData');
    return saved ? JSON.parse(saved) : defaultData;
  } catch (error) {
    return defaultData;
  }
}

function renderHeroStats() {
  const data = getSiteData();
  const list = document.getElementById('heroStats');
  if (!list) return;

  list.innerHTML = (data.stats || defaultData.stats)
    .map((item) => `<li>${item}</li>`)
    .join('');
}

function renderLeader() {
  const data = getSiteData();
  const leaderName = document.getElementById('leaderName');
  const leaderRole = document.getElementById('leaderRole');

  if (leaderName) leaderName.textContent = data.leader?.name || defaultData.leader.name;
  if (leaderRole) leaderRole.textContent = data.leader?.role || defaultData.leader.role;
}

function renderLeadership() {
  const data = getSiteData();
  const container = document.getElementById('leadershipGrid');
  if (!container) return;

  container.innerHTML = (data.leadership || defaultData.leadership)
    .map(
      (item) => `
        <article class="leadership-card">
          <span class="role-tag">${item.role}</span>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </article>
      `
    )
    .join('');
}

function renderActivities() {
  const data = getSiteData();
  const container = document.getElementById('activityGrid');
  if (!container) return;

  container.innerHTML = (data.activities || defaultData.activities)
    .map(
      (item) => `
        <article class="activity-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
}

function renderNews() {
  const data = getSiteData();
  const container = document.getElementById('newsList');
  if (!container) return;

  container.innerHTML = (data.news || defaultData.news)
    .map(
      (item) => `
        <article class="news-card">
          <span class="date">${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join('');
}

function renderContact() {
  const data = getSiteData();
  const contactCard = document.querySelector('.contact-card');
  if (!contactCard) return;

  const contact = data.contact || defaultData.contact;
  contactCard.innerHTML = `
    <p><strong>Maktab:</strong> ${contact.school}</p>
    <p><strong>Telefon:</strong> ${contact.phone}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Manzil:</strong> ${contact.address}</p>
  `;
}

function initSite() {
  renderHeroStats();
  renderLeader();
  renderLeadership();
  renderActivities();
  renderNews();
  renderContact();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initSite);
