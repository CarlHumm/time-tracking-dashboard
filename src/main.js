import './style.scss';

window.addEventListener('DOMContentLoaded', async (e) => {
   
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
          <div class="card__stats" data-range="${range}">
            <p class="card__stat card__stat--current">${values.current}hrs</p>
            <p class="card__stat card__stat--previous">Previous - ${values.previous}hrs</p>
          </div>
        `;
      });
    
      cardElements.push(`
        <article class="card dashboard__item rounded card--${card.title.toLowerCase()}">
          <div class="card__inner cushion-2">
            <div class="card__header">
              <h3 class="card__title">${card.title}</h3>
              <button class="card__menu-button" aria-label="Options">...</button>
            </div>
            ${statsMarkup}
          </div>
        </article>
      `);
    });
    
    document.querySelector('.dashboard__grid').innerHTML = cardElements.join('');
    cards.forEach((card) => console.log(card));
}

















