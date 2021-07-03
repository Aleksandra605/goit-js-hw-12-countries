function fetchCountries(country) {
  return new Promise((resolve, reject) =>
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((response) =>
      response.status === 404
        ? reject(response.json())
        : resolve(response.json())
    )
  );
}
export default fetchCountries;
