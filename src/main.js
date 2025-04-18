import './style.scss';
import { fetchData } from './fetchData.js';
import { renderCards } from './render.js';
import { getSelectedRange } from './getRange.js';

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

      localStorage.setItem('rangeSelection', range);

      if (e.target.getAttribute('aria-pressed') === 'true') return;

      document.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', false);
      e.target.setAttribute('aria-pressed', true);

      document.querySelectorAll('.card__stats').forEach(stat => {
        stat.classList.toggle('show', stat.dataset.range === range);
      });
    })
  );
}