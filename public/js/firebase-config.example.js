// Copy this file to public/js/firebase-config.js and fill the values.
// This repository uses a simple client-side Firebase integration for optional admin features.
// Do NOT commit your real credentials to the repo — keep firebase-config.js in .gitignore.

window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// If you prefer Supabase, you can instead create a similar window.supabaseConfig object
