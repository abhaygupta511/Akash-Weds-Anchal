# Akash & Anchal — Royal Wedding Invitation

A responsive, static wedding invitation website built with HTML, CSS and vanilla JavaScript.

## Included
- Royal maroon-and-gold design with a cinematic invitation opening
- Responsive mobile navigation
- English and Hindi copy
- Countdown to 25 November 2026
- Music toggle (generated ambient tones; not a recorded song)
- Wedding events section
- Google Maps placeholder
- RSVP form validation and email-draft/copy behaviour
- Scroll reveal animations and reduced-motion support

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For the best local preview, use VS Code with the **Live Server** extension and click **Go Live**.

The page uses Google Fonts and remote Unsplash photographs, so an internet connection is needed for those assets. Replace these with your own licensed images if desired.

## Personalise before publishing
1. **Venue and timings:** edit the event cards and venue details in `index.html`.
2. **Maps:** replace the `href` on `#mapLink` with a real Google Maps venue link, and remove the placeholder confirmation handler at the bottom of `script.js`.
3. **RSVP email:** in `script.js`, set `const RSVP_EMAIL = 'your-email@example.com';`. This opens the visitor's email app with a prefilled RSVP. It does not store responses online.
4. **Online RSVP collection:** to collect responses without email, connect a form backend/service (for example, Formspree or a custom endpoint) and update the form submit handler.
5. **Music:** the toggle generates soft ambient tones using the browser's Web Audio API. If you prefer a real song, use an audio file you have permission to use and wire it to the music button.
6. **Photos:** update the `background-image` URLs in `style.css` to use your preferred wedding photos or artwork.

## Publish on GitHub Pages
1. Sign in to GitHub and create a new public repository, e.g. `akash-anchal-wedding`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root (not inside another nested folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then click **Save**.
6. Wait for the Pages deployment to finish. GitHub will show your public website URL under **Settings → Pages**.
7. Open that URL on your phone and desktop to test it.

## Notes
- Wedding date is set to 25 November 2026. Countdown uses the visitor's local browser time and targets midnight at the start of that date.
- Venue, timings, family names, RSVP destination and actual song are placeholders until you provide the details.
- This is a static website; it does not include a database or server-side RSVP storage.
