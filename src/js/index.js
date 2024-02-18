import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// ###############################################################
// Variable Declarations and Assignments
// ###############################################################
const myApiKey =
  'live_FaYe3itLIQThUBvx8Cu9pMYvnNyd6GooIjHHvQivp6Siz06QDDNZPXrCotQFK2nh';

axios.defaults.headers.common['x-api-key'] = myApiKey;

const selectBreed = document.querySelector('select.breed-select');
const loaderElement = document.querySelector(`span.loader`);
const errorElement = document.querySelector(`p.error`);
const catInfoElement = document.querySelector(`div.cat-info`);

selectBreed.addEventListener('change', searchSelected);
//
//
// ###############################################################
// Functions
// ###############################################################
function createOptions(dataArray) {
  console.log(dataArray);
  const optionsMarkup = dataArray
    .map(data => {
      return `<option value='${data.id}'>${data.name}</option>`;
    })
    .join('');

  selectBreed.insertAdjacentHTML('beforeend', optionsMarkup);
  toggleSelect();
  toggleLoader();
}

function searchSelected() {
  const breedSelected = selectBreed.value;
  toggleLoader();
  hideCatInfo();

  fetchCatByBreed(breedSelected)
    .then(data => {
      renderData(data);
      hideError();
    })
    .catch(error => {
      toggleLoader();
      showError();
    });
}

function renderData(data) {
  clearCatInfo();

  const imgSrc = data[0].url;
  const catName = data[0].breeds[0].name;
  const catDesc = data[0].breeds[0].description;
  const catTemper = data[0].breeds[0].temperament;

  const infoMarkup = `
  <img src="${imgSrc}" width="500" alt="${catName}">
  <div class="text-container">
  <h2>${catName}</h2>
  <p class="cat-desc">${catDesc}</p>
  <p class="cat-temper"><strong>Temperament:</strong> ${catTemper}</p>
  </div>
  `;
  catInfoElement.insertAdjacentHTML('afterbegin', infoMarkup);

  toggleLoader();
  showCatInfo();
}

function clearCatInfo() {
  catInfoElement.innerHTML = '';
}

function toggleLoader() {
  loaderElement.classList.toggle('hidden');
}

function toggleSelect() {
  selectBreed.classList.toggle('hidden');
}

function showError() {
  errorElement.classList.remove(`hidden`);
}

function hideError() {
  errorElement.classList.add(`hidden`);
}

function hideCatInfo() {
  catInfoElement.classList.add(`hidden`);
}

function showCatInfo() {
  catInfoElement.classList.remove(`hidden`);
}

//
//
// ###############################################################
// Initialization
// ###############################################################
console.log(`test`);

fetchBreeds()
  .then(data => {
    createOptions(data);
    hideError();
  })
  .catch(error => {
    toggleLoader();
    showError();
  });
