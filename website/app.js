'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

// Remove the preference saved by the previous bilingual page.
try { localStorage.removeItem('poppy-language'); } catch { /* Storage is optional. */ }

const thoughts = {
  start: 'Start with one thing you can finish. It can be much smaller than you think.',
  full: 'Leave a little space in your plan. Your time and energy have limits too.',
  again: 'Look at what you actually did this week. What would you change next time?'
};
const tips = {
  why: 'Finish this sentence: I want to do this because...',
  small: 'Choose one thing you could do in the next 15 minutes.',
  back: 'Think of one thing that went well and one thing you would change.'
};

function animatePanel(panel) {
  if (reducedMotion.matches) return;
  panel.classList.remove('panel-changing');
  void panel.offsetWidth;
  panel.classList.add('panel-changing');
}

function setupTabs(selector, dataKey, panelId, textId, values) {
  const tabs = [...document.querySelectorAll(selector)];
  const panel = document.getElementById(panelId);
  const text = document.getElementById(textId);
  function select(button) {
    tabs.forEach(tab => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    text.textContent = values[button.dataset[dataKey]];
    panel.setAttribute('aria-labelledby', button.id);
    animatePanel(panel);
  }
  tabs.forEach((button,index) => {
    button.addEventListener('click', () => select(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
}
setupTabs('[data-thought]', 'thought', 'thought-panel', 'thought-answer', thoughts);
setupTabs('[data-step]', 'step', 'step-panel', 'step-tip', tips);

const greetButton = document.getElementById('greet-poppy');
const mascot = document.getElementById('hero-mascot');
const greeting = document.getElementById('poppy-greeting');
let greetingTimer;
const welcomeAsset = new Image();
welcomeAsset.src = 'assets/poppy-welcome.webp';
greetButton.addEventListener('click', () => {
  clearTimeout(greetingTimer);
  if (welcomeAsset.complete && welcomeAsset.naturalWidth > 0) mascot.src = welcomeAsset.src;
  greeting.textContent = 'Hey you! Glad you’re here ♡';
  greetButton.classList.add('is-greeting');
  greetingTimer = setTimeout(() => {
    mascot.src = 'assets/poppy-mascot.webp';
    greeting.textContent = 'psst… tap to say hi!';
    greetButton.classList.remove('is-greeting');
  }, 3000);
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {threshold: 0.08});
  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));
  document.documentElement.classList.add('motion-ready');
}

const heroArt = document.querySelector('[data-parallax]');
let pointerFrame = 0;
let pointerX = 0;
let pointerY = 0;
function paintPointer() {
  pointerFrame = 0;
  heroArt.style.setProperty('--mx', pointerX.toFixed(3));
  heroArt.style.setProperty('--my', pointerY.toFixed(3));
}
heroArt.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches) return;
  const bounds = heroArt.getBoundingClientRect();
  pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  pointerY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
});
heroArt.addEventListener('pointerleave', () => {
  pointerX = 0;
  pointerY = 0;
  if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
});

document.querySelectorAll('.step-card').forEach(card => {
  let frame = 0;
  let x = 50;
  let y = 50;
  function paint() {
    frame = 0;
    card.style.setProperty('--sx', `${x}%`);
    card.style.setProperty('--sy', `${y}%`);
  }
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches) return;
    const bounds = card.getBoundingClientRect();
    x = (event.clientX - bounds.left) / bounds.width * 100;
    y = (event.clientY - bounds.top) / bounds.height * 100;
    if (!frame) frame = requestAnimationFrame(paint);
  });
  card.addEventListener('pointerleave', () => {
    x = 50;
    y = 50;
    if (!frame) frame = requestAnimationFrame(paint);
  });
});

let scrollFrame = 0;
function paintProgress() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
  document.documentElement.style.setProperty('--progress', progress.toFixed(4));
}
function scheduleProgress() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(paintProgress);
}
window.addEventListener('scroll', scheduleProgress, {passive: true});
window.addEventListener('resize', scheduleProgress, {passive: true});
window.addEventListener('load', scheduleProgress, {once: true});
paintProgress();
