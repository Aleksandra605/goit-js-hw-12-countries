import { showStackBottomRight } from './showNotice';

function fetchCountries(country) {
  return new Promise((resolve, reject) =>
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((response) =>
      response.status === 404
        ? reject(showStackBottomRight('error'))
        : resolve(response.json())
    )
  );
}
export default fetchCountries;
