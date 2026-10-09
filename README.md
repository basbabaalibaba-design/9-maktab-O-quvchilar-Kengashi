# Oʻquvchilar Kengashi - Veb Sayt

Maktab Oʻquvchilar Kengashining rasmiy veb-saytı. **Netlify** hosting + **Admin Panel** bilan.

## 📋 Loyohaning Tuzilmasi

```
9-maktab-O-quvchilar-Kengashi/
├── public/                    # Statik fayllar
│   ├── index.html            # Bosh sahifa
│   ├── css/
│   │   ├── style.css
│   │   └── admin.css
│   ├── js/
│   │   ├── main.js
│   │   ├── admin.js
│   │   └── db.js (Firebase/Supabase)
│   └── images/
├── netlify.toml              # Netlify konfiguratsiyasi
├── functions/                # Netlify Functions (Backend)
│   ├── auth.js
│   └── api.js
├── admin/                    # Admin Panel
│   ├── index.html
│   ├── dashboard.html
│   └── login.html
├── data/                     # JSON ma'lumotlar
│   ├── members.json
│   ├── events.json
│   └── news.json
└── package.json
```

## 🎯 Xususiyatlari

### 👥 Ommaviy Sayt (Public)
- ✅ Bosh sahifa
- ✅ Kengash tuzilmasi
- ✅ Koordinatorlar
- ✅ Yangiliklar va tadbirlar
- ✅ Nizom (PDF)
- ✅ Bog'lanish

### 🔐 Admin Panel (Private)
- 🔑 Kirish (Login)
- 📝 Koordinatorlarni boshqarish
- 📰 Yangiliklar yaratish/o'zgartirish
- 📅 Tadbirlarni jadvalka olish
- 👥 A'zolarni qaydaga olish
- 📊 Statistika/Hisobot

## 🚀 Texnologiyalar

| Qator | Teknologiya |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Database** | Firebase Realtime / Supabase |
| **Hosting** | Netlify |
| **Backend** | Netlify Functions |
| **Auth** | Firebase Authentication |

## 📦 O'rnatish

```bash
# GitHub-dan clone qiling
git clone https://github.com/basbabaalibaba-design/9-maktab-O-quvchilar-Kengashi.git
cd 9-maktab-O-quvchilar-Kengashi

# Bog'lanishlarni o'rnating
npm install

# Local test
npm run dev

# Netlify-ga deploy qiling
netlify deploy
```

## 🔧 Netlify Konfiguratsiyasi

`netlify.toml` faylida:
```toml
[build]
  command = "npm run build"
  publish = "public"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

## 🔐 Database Tanlash

### **Variant 1: Firebase** (Tavsiya etiladi)
- ✅ Real-time ma'lumotlar
- ✅ Bepul 5GB makon
- ✅ Oson authentication
- ✅ Netlify bilan integratsiya

### **Variant 2: Supabase**
- ✅ Open-source PostgreSQL
- ✅ Bepul 500MB
- ✅ REST API
- ✅ Real-time

## 📱 Admin Panel Imkoniyatlari

```
LOGIN → DASHBOARD
         ├── Koordinatorlarni tahrirla
         ├── Yangiliklar qosh/o'zgartir
         ├── Tadbirlar jadvalka qil
         ├── A'zolar ro'yxati
         └── Statistika ko'rish
```

## 📄 Fayllar

- `public/index.html` - Bosh sahifa
- `admin/index.html` - Admin panel
- `netlify.toml` - Hosting konfiguratsiyasi
- `functions/` - Backend API-lar

---

**Qo'shimcha savollar?** Issues yoki Discussions orqali yozing! 🚀
