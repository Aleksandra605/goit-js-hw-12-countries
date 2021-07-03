import fetchCountries from './fetchCountries';
import countryTpl from './templates/countryCard.hbs';
import countriesList from './templates/countriesList.hbs';
import lodashDebounce from 'lodash.debounce';

import { showStackBottomRight } from './showNotice';

const input = document.querySelector('.input');
const countriesBox = document.querySelector('.countries-box');
input.addEventListener('input', lodashDebounce(createCountryList, 1000));

function createCountryList() {
  countriesBox.innerHTML = '';
  fetchCountries(input.value)
    .then(renderContent)
    .catch((error) => {
      console.error('error', error);
      showStackBottomRight('error');
    })
    .finally(() => (input.value = ''));
}

function renderCountryCard(x) {
  countriesBox.insertAdjacentHTML('beforeend', countryTpl(x));
}

function renderCountriesList(list) {
  countriesBox.insertAdjacentHTML('beforeend', countriesList(list));
  document.querySelector('.countries-list').addEventListener('click', (ev) => {
    const elementIndex = ev.target.dataset.index;
    countriesBox.innerHTML = '';
    renderCountryCard(list[elementIndex]);
  });
}

function renderContent(response) {
  if (response.length < 11 && response.length > 1) {
    renderCountriesList(response);
  } else if (response.length >= 11) {
    showStackBottomRight('notice');
  } else renderCountryCard(response[0]);
}
