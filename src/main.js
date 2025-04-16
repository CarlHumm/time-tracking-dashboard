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
    cards.forEach((card) => console.log(card));
}

















