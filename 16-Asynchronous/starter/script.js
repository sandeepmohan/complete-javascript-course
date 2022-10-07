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
  countriesContainer.style.opacity = 1;
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

// btn.addEventListener('click', function () {
//   getCountryData('singapore');
// });

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

// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;
//   });
//   return fetch(
//     `https://geocode.xyz/${lat},${long}?geoit=json&auth=127038196057666223004x22061`
//   )
//     .then(response => {
//       if (!response.status === 200)
//         throw new Error(
//           `Problem with the reverse geoCoding API. Try again in a bit. Error Code: ${response.status}`
//         );
//       return response.json();
//     })
//     .then(response => {
//       console.log(`You are in ${response.city}, ${response.country}!!`);
//       return response.country;
//     })
//     .then(response => getCountryData(`${response}`))
//     .catch(err => console.error(`${err.message} - ${err}`));
// };
// console.log(whereAmI(latlongt3[0], latlongt3[1]));

// https://geocode.xyz/52.508,13.381?geoit=xml&auth=127038196057666223004x22061

// .then(response => {
//     if (!response.status === 200)
//       throw new Error(`Can't get shit!! Error Code: ${response.status}`);
//     return response.json;
//   })

// console.log('Test Start');
// setTimeout(() => console.log('0 second timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test End');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery Draw is happening ... 🔮');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You Win 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying the Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => {
//   const { latitude: lat, longitude: lng } = pos.coords;
// });

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${long}?geoit=json&auth=127038196057666223004x22061`
      );
    })
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

// btn.addEventListener('click', whereAmIasysnc);

// function ipsBetween(start, end) {
//   const startArray = start.split('.').map(el => Number(el));
//   const endArray = end.split('.').map(el => Number(el));
//   const numIps = Math.abs(
//     16777216 * (startArray[0] - endArray[0]) +
//       65536 * (startArray[1] - endArray[1]) +
//       256 * (startArray[2] - endArray[2]) +
//       (startArray[3] - endArray[3])
//   );
//   // .forEach(str => (!str === '0' ? ipsArray.push(Number(str)) : 0));

//   return numIps;
// }
// console.log(ipsBetween('10.0.0.0', '10.0.0.50'));

// console.log('10.0.0.0'.split('.').forEach(x => Number(x)));
// ((a[0] - b[0]) * 256 + a[1] - b[1]) * 256 + a[2] - b[2]) * 256 + a[3] - b[3]

// acc =
//   (arr[0][0] - arr[1][0]) * 256 +
//   (arr[0][1] - arr[1][1]) * 256 +
//   (arr[0][2] - arr[1][2]) * 256 +
//   (arr[0][3] - arr[1][3]) * 256;

// function ipsBetween(start, end) {
//   const startArray = start.split('.').map(el => Number(el));
//   const endArray = end.split('.').map(el => Number(el));
//   const numIps = Math.abs(
//     16777216 * (startArray[0] - endArray[0]) +
//       65536 * (startArray[1] - endArray[1]) +
//       256 * (startArray[2] - endArray[2]) +
//       (startArray[3] - endArray[3])
//   );
//   return numIps;
// }

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded!');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded!');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.

// function generateHashtag(str) {
//   if (str === '' || str === ' ') return false;
//   const hashString = str
//     .toLowerCase()
//     .trim()
//     .split(' ')
//     .filter(n => n)
//     .map(element => {
//       return `${element[0].toUpperCase()}${element.slice(1)}`;
//     })
//     .join('');
//   const hashTag = `#${hashString}`;
//   if (hashTag.length > 140 || hashTag === '#') {
//     return false;
//   } else {
//     return hashTag;
//   }
// }
// console.log(generateHashtag(''));
// console.log(generateHashtag('Do We have A Hashtag'));
// console.log(generateHashtag('a'.repeat(141)));
// console.log(generateHashtag('code' + ' '.repeat(10) + 'wars'));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmIasysnc = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await (
      await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=127038196057666223004x22061`
      )
    ).json();
    if (!resGeo.status === 200) throw new Error('Problem getting coordinates');
    const res = await fetch(
      `https://restcountries.com/v2/name/${resGeo.country}`
    );
    if (!res.status === 200) throw new Error('Problem getting country data');
    const data = await res.json();

    renderCountry(data[0]);
    return `You are in ${resGeo.city}, ${resGeo.statename} in ${resGeo.country}.`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
    throw err;
  }
};
whereAmIasysnc().then(city => console.log(city));

// btn.addEventListener('click', whereAmIasysnc);

function sumStrings(a, b) {
  const SumStr = String(BigInt(a) + BigInt(b));
  return SumStr;
}
console.log(
  sumStrings('712569312664357328695151392', '8100824045303269669937')
);

// Coding Challenge #4

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded!');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded!');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    // Load Image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    // Load Image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();
// Part 2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
