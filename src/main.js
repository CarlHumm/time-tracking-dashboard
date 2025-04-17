import './style.scss';

window.addEventListener('DOMContentLoaded', async (e) => {
   
   const buttons = document.querySelectorAll('.dashboard__control-button');
   buttons.forEach((button) => {
    button.addEventListener('click', toggleData);
   });

   const cards = await fetchData('./data.json');

   if(!cards) {
    console.error(cards.Error);
    return;
   } 
   renderCards(cards);
});

async function fetchData(url) {

    let path = url;

    try {
        const response = await fetch(path);
        if(!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        return  data;
    } catch (error) {
        console.error(error.message);
    }

}

function renderCards(cards) {

    let cardElements = [];

    cards.forEach((card) => {
      let statsMarkup = '';

          Object.entries(card.timeframes).forEach(([range, values]) => {
        statsMarkup += `
          <div class="card__stats ${range === "daily" ? "show" : ""}" data-range="${range}">
            <p class="card__stat card__stat--current">${values.current}hrs</p>
            <p class="card__stat card__stat--previous">Previous - ${values.previous}hrs</p>
          </div>
        `;
      });

      cardElements.push(`
        <article class="card dashboard__item rounded card--${formatSpaces(card.title)}">
          <div class="card__background"></div>
          <div class="card__inner rounded cushion-2">
            <div class="card__header">
              <h3 class="card__title">${card.title}</h3>
              <button class="card__menu-button" aria-label="Options"><svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg></button>
            </div>
            ${statsMarkup}
          </div>
        </article>
      `);
    });
    
    document.querySelector('.dashboard__grid').innerHTML = cardElements.join('');
    cards.forEach((card) => console.log(card));
}


function formatSpaces(str) {
  return str.replace(/\s+/g, '-').toLowerCase()
}

function toggleData(e) {

if(e.target.getAttribute('aria-pressed') === "true") {
  return;
}

  document.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', false);
  e.target.setAttribute('aria-pressed', true);

  let range = e.target.getAttribute('data-range');

  document.querySelectorAll('.card__stats.show').forEach((stat) => {
    stat.classList.remove('show');
  })

 document.querySelectorAll(`.card__stats[data-range=${range}]`).forEach((stat) => {
  stat.classList.add('show');
 });
}











