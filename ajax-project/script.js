const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state that matches what was searced
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

function numberWithCommas(x) {
    // add commas to the numbers
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        // here we can add some color for searched value using these class selector
        const cityName = place.city.replace(regex, `<span class='h1'>${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class='h1'>${this.value}</span>`)
        return `
            <li>
                <span class='name'>${cityName}, ${stateName}</span>
                <span class='population'> ${numberWithCommas(place.population)}</span>
            </li>
        `
    }).join('')
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);