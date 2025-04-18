import { getSelectedRange } from "./getRange";
import { formatSpaces } from "./formatSpaces";

  function generateStatsHTML(timeframes) {
    return Object.entries(timeframes).map(([range, { current, previous }]) => `
      <div class="card__stats ${range === getSelectedRange() ? 'show' : ''}" data-range="${range}">
        <p class="card__stat card__stat--current">${current}hrs</p>
        <p class="card__stat card__stat--previous">${getLabel(range)} - ${previous}hrs</p>
      </div>
    `).join('');
  }
  
  export function generateCardHTML(card) {
    const title = formatSpaces(card.title);
    return `
      <article class="card dashboard__item rounded card--${title}">
        <div class="card__background"></div>
        <div class="card__inner rounded cushion-2">
          <div class="card__header">
            <h3 class="card__title">${card.title}</h3>
            <button class="card__menu-button" aria-label="Options">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
              </svg>
            </button>
          </div>
          ${generateStatsHTML(card.timeframes)}
        </div>
      </article>
    `;
  }
  
  export function renderCards(cards, containerSelector = '.dashboard__grid') {
    const container = document.querySelector(containerSelector);
    container.innerHTML = cards.map(generateCardHTML).join('');
  }

 function getLabel(range) {
    const labels = {
        daily: 'Yesterday',
        weekly: 'Last week',
        monthly: 'Last month',
      };
     
      return labels[range] || '';
 }