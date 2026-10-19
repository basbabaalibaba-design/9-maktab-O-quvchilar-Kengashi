# Admin and data integration

This patch adds basic data and an admin UI with localStorage + optional Firebase support.

What I changed:

- Added public/data/site.json — canonical site data used by the public site.
- Updated public/js/main.js to fetch /data/site.json (with localStorage fallback), add lazy background loading and keep the reveal animation.
- Added public/js/firebase-config.example.js — template for Firebase config. Copy to public/js/firebase-config.js and fill values (DO NOT commit your real keys).
- Added a simple admin UI under /admin with CRUD for news and leadership. The admin page saves data to localStorage and, if you add a valid Firebase config, will save to Firestore as well.
- Added admin styles and admin JS.

How to use

1. Local test

   npm run dev
   Open http://localhost:8000/
   Admin: http://localhost:8000/admin/

2. Firebase (optional)

   - Copy `public/js/firebase-config.example.js` to `public/js/firebase-config.js` and enter your Firebase project values.
   - Enable Email/Password auth in Firebase console and add a test user (or use the demo admin password `admin` for local mode).
   - If you want Firestore writes, create a Firestore DB in the console.

3. Deploy

   The site is static — deploy to Netlify, Vercel, GitHub Pages, etc.

Notes

- This is intentionally minimal. For production you should not store secrets in client-side files. Use server-side functions or Netlify Functions to keep credentials secret.
- Parollarsiz demo holatda admin uchun foydalanish qulay, lekin production uchun Firebase Auth tavsiya qilaman.
