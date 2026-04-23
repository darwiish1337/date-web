/* ─── STATE ─────────────────────────────────────────── */
let isFloating = false;
let noHoverCount = 0; // Track hovers on "No" button

const noBtn       = document.getElementById('noBtn');
const card        = document.getElementById('card');
const yesOverlay  = document.getElementById('yesOverlay');
const noOverlay   = document.getElementById('noOverlay');

/* ─── RANDOM SAFE POSITION ──────────────────────────── */
function getRandomPos() {
  const margin = 15;
  const btnW = noBtn.offsetWidth || 80;
  const btnH = noBtn.offsetHeight || 40;

  const avoidElements = [
    document.querySelector('.cat-wrapper'),
    document.querySelector('.headline'),
    document.getElementById('yesBtn')
  ];

  const cardRect = card.getBoundingClientRect();
  const avoidRects = avoidElements.map(el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const pad = 15;
    return {
      left: r.left - cardRect.left - pad,
      top: r.top - cardRect.top - pad,
      right: r.right - cardRect.left + pad,
      bottom: r.bottom - cardRect.top + pad
    };
  }).filter(r => r !== null);

  const maxX = Math.max(0, card.clientWidth - btnW - margin);
  const maxY = Math.max(0, card.clientHeight - btnH - margin);

  let x, y, overlaps;
  let attempts = 0;

  do {
    x = margin + Math.random() * (maxX - margin > 0 ? maxX - margin : 0);
    y = margin + Math.random() * (maxY - margin > 0 ? maxY - margin : 0);
    
    overlaps = avoidRects.some(rect => {
      return !(x + btnW < rect.left || 
               x > rect.right || 
               y + btnH < rect.top || 
               y > rect.bottom);
    });
    attempts++;
  } while (overlaps && attempts < 150);

  return { x, y };
}

/* ─── MAKE NO BUTTON FLOAT ──────────────────────────── */
function makeFloat() {
  if (isFloating) return;
  isFloating = true;

  card.appendChild(noBtn);
  noBtn.classList.add('floating');
  noBtn.style.width = '100px';
  moveNoBtn();
  noBtn.style.margin = '0';
}

/* ─── MOVE NO BUTTON ─────────────────────────────────── */
function moveNoBtn() {
  if (!isFloating) makeFloat();
  
  // Count the hover
  noHoverCount++;
  
  // Show threat overlay after 3 hovers
  if (noHoverCount >= 3) {
    showNoOverlay();
  }

  const { x, y } = getRandomPos();
  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
}

/* ─── OVERLAY FUNCTIONS ─────────────────────────────── */
function showNoOverlay() {
  noOverlay.classList.add('show');
  // Reset count so it can happen again if they continue
  noHoverCount = 0; 
}

function closeNoOverlay() {
  noOverlay.classList.remove('show');
}

function onYes() {
  yesOverlay.classList.add('show');
}

/* ─── LISTENERS ─────────────────────────────────────── */
noBtn.addEventListener('mouseenter', moveNoBtn);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoBtn();
}, { passive: false });

yesOverlay.addEventListener('click', (e) => {
  if (e.target === yesOverlay) yesOverlay.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    yesOverlay.classList.remove('show');
    noOverlay.classList.remove('show');
  }
});

window.addEventListener('resize', () => {
  if (isFloating) moveNoBtn();
});
