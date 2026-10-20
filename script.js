const intro = document.getElementById('intro');
const shell = document.getElementById('siteShell');
const openInvite = document.getElementById('openInvite');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// The invitation opens on a deliberate tap/click for a more card-like experience.
openInvite.addEventListener('click', () => {
  intro.classList.add('hide');
  shell.classList.add('ready');
  shell.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  window.setTimeout(() => intro.setAttribute('aria-hidden', 'true'), 900);
  revealObserver.observeAll?.();
});
document.body.classList.add('locked');

// Countdown uses local browser time; wedding date is 25 November 2026 at midnight.
const weddingDate = new Date(2026, 10, 25, 0, 0, 0);
const countdownEls = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};
function updateCountdown() {
  let diff = weddingDate.getTime() - Date.now();
  if (diff <= 0) {
    Object.values(countdownEls).forEach(el => el.textContent = '00');
    document.querySelector('.countdown-caption').textContent =
      diff > -86400000 ? 'Today is the day — let the celebrations begin!' : 'A beautiful day to remember. Thank you for celebrating with us.';
    return;
  }
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Soft, generated ambient tones: no external audio file required.
// Browsers only allow audio after the user presses the music control.
let audioContext = null, oscillators = [], gainNode = null, musicOn = false;
function startAmbientMusic() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    musicLabel.textContent = 'Audio unavailable';
    return;
  }
  audioContext = audioContext || new AudioCtx();
  if (audioContext.state === 'suspended') audioContext.resume();
  gainNode = audioContext.createGain();
  gainNode.gain.value = 0.025;
  gainNode.connect(audioContext.destination);
  // Gentle sustained tones, meant as a subtle ambience rather than a song.
  [196, 293.66, 392].forEach((frequency, index) => {
    const osc = audioContext.createOscillator();
    const toneGain = audioContext.createGain();
    osc.type = index === 1 ? 'sine' : 'triangle';
    osc.frequency.value = frequency;
    toneGain.gain.value = index === 0 ? 0.5 : 0.22;
    osc.connect(toneGain);
    toneGain.connect(gainNode);
    osc.start();
    oscillators.push(osc);
  });
}
function stopAmbientMusic() {
  oscillators.forEach(osc => { try { osc.stop(); } catch (_) {} });
  oscillators = [];
  if (gainNode) { try { gainNode.disconnect(); } catch (_) {} }
  gainNode = null;
}
musicToggle.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) startAmbientMusic(); else stopAmbientMusic();
  musicToggle.setAttribute('aria-pressed', String(musicOn));
  musicLabel.textContent = musicOn ? 'Music on' : 'Music off';
});

// Mobile navigation
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// RSVP: creates a prefilled email draft. Replace the address below with the couple's contact.
const RSVP_EMAIL = ''; // Example: 'akash.anchal@example.com'
document.getElementById('rsvpForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent('Wedding RSVP — ' + data.get('guestName'));
  const body = encodeURIComponent(
    'Akash & Anchal Wedding RSVP\n\n' +
    'Name: ' + data.get('guestName') + '\n' +
    'Email: ' + (data.get('guestEmail') || 'Not provided') + '\n' +
    'Attendance: ' + data.get('attendance') + '\n' +
    'Guests: ' + data.get('guestCount') + '\n' +
    'Message: ' + (data.get('message') || '—')
  );
  const status = document.getElementById('formStatus');
  if (RSVP_EMAIL) {
    window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app is opening with your RSVP details. Please send the email to confirm.';
  } else {
    const emailText = decodeURIComponent(body);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailText).then(() => {
        status.textContent = 'RSVP details copied. Add the couple’s email in script.js to enable email submission, or connect an online form service.';
      }).catch(() => {
        status.textContent = 'Your details are ready, but online submission is not configured yet. Please connect an RSVP service.';
      });
    } else {
      status.textContent = 'Online RSVP collection is not configured yet. Add an email in script.js or connect a form service.';
    }
  }
});

// Venue is intentionally a placeholder until the actual location is known.
document.getElementById('mapLink').addEventListener('click', event => {
  if (!confirm('The wedding venue has not been added yet. Open Google Maps to search for a location?')) {
    event.preventDefault();
  }
});
