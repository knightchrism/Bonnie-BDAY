# Bonnie's Birthday Quest 🎃🎂

A tiny birthday scavenger hunt: one sister sends the other on four little quests.

- Static `index.html` + `app.js` — no external scripts, fonts, trackers, or servers.
- Quest 1 shows first. When Bonnie finishes a quest she taps **"Let her know I'm done!"**, which opens a prefilled text (or email) she sends to her sister.
- Her sister replies with a secret code; entering it unlocks the next quest. Codes are stored only as SHA-256 hashes.
- Progress is saved in the browser (localStorage). "Start over" resets it.
- Strict Content-Security-Policy (`default-src 'self'`, `script-src 'self'`).

Hosted with GitHub Pages.
