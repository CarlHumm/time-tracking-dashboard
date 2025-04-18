import './style.scss';
import { fetchData } from './js/fetchData.js';
import { renderCards } from './js/render.js';
import { getSelectedRange } from './js/getRange.js';
import { delay } from './js/delay.js';

window.addEventListener('DOMContentLoaded', async () => {
  const cards = await fetchData('./data.json');

  if (!cards) return;

  renderCards(cards);
  setupButtons();
});

function setupButtons() {
  const buttons = document.querySelectorAll('.dashboard__control-button');

  document.querySelector(`[data-range=${getSelectedRange()}]`).setAttribute('aria-pressed', true);

  buttons.forEach(btn =>
    btn.addEventListener('click', (e) => {
      const range = e.target.dataset.range;
      const stats = document.querySelectorAll('.card__stats');
      localStorage.setItem('rangeSelection', range);

      if (e.target.getAttribute('aria-pressed') === 'true') return;

      document.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', false);
      e.target.setAttribute('aria-pressed', true);

      stats.forEach(async function(stat) {
        let isSelectedStat= stat.dataset.range === range;
          animateChangeStats(stat, isSelectedStat);
      });
    })
  );
}


async function animateChangeStats(stat, selected) {
  
if(selected) {
  stat.classList.add('show');
  stat.classList.add('animate-in');
  stat.classList.remove('animate-out');
  await delay(1000);
}
else {
  stat.classList.add("animate-out");
  stat.classList.remove("animate-in");
  await delay(1000);
  stat.classList.remove('show');
}
  

}