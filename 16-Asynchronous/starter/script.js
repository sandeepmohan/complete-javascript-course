'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://restcountries.com/v2/
const renderCountry = function (data, neigh = '') {
  const html = `
  <article class="country ${neigh}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.toUpperCase()}</h3>
            <h4 class="country__region">${data.region.toUpperCase()}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)} million(s) people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

// const getCountryandNeighborData = function (country) {
//   // AJAX Country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render Country 1
//     renderCountry(data);
//     console.log(data);

//     // Get Neighbor country
//     const neighbor = data.borders;
//     console.log(neighbor);
//     if (!neighbor) return;

//     // Ajax Call 2

//     for (const neigh of neighbor) {
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v2/alpha/${neigh}`);
//       request2.send();
//       request2.addEventListener('load', function () {
//         const data2 = JSON.parse(this.responseText);
//         renderCountry(data2, 'neighbour');
//       });
//     }
//   });
// };
// getCountryandNeighborData('singapore');
// // getCountryandNeighborData('usa');
// // getCountryandNeighborData('italy');

// With Promises and fetch api

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.status === 200)
      throw new Error(`${errorMsg} - (Status Code - ${response.status})`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       response.json();
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥😱💥`);
//       renderError(`Something went wrong 💥😱💥. ${err.message}. `);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

btn.addEventListener('click', function () {
  getCountryData('singapore');
});

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Neighboring Country(ies) not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥😱💥`);
      renderError(`Something went wrong 💥😱💥. ${err.message}. `);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

///////////////////////////////////////
// Coding Challenge #1

// API Key: 127038196057666223004x22061

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const latlongt1 = [52.508, 13.381];
const latlongt2 = [19.037, 72.873];
const latlongt3 = [-33.933, 18.474];

const whereAmI = function (lat, long) {
  return fetch(
    `https://geocode.xyz/${lat},${long}?geoit=json&auth=127038196057666223004x22061`
  )
    .then(response => {
      if (!response.status === 200)
        throw new Error(
          `Problem with the reverse geoCoding API. Try again in a bit. Error Code: ${response.status}`
        );
      return response.json();
    })
    .then(response => {
      console.log(`You are in ${response.city}, ${response.country}!!`);
      return response.country;
    })
    .then(response => getCountryData(`${response}`))
    .catch(err => console.error(`${err.message} - ${err}`));
};
console.log(whereAmI(latlongt3[0], latlongt3[1]));

// https://geocode.xyz/52.508,13.381?geoit=xml&auth=127038196057666223004x22061

// .then(response => {
//     if (!response.status === 200)
//       throw new Error(`Can't get shit!! Error Code: ${response.status}`);
//     return response.json;
//   })
