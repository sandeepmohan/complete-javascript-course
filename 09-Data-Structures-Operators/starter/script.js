'use strict';

// // // Data needed for a later exercise
// // const flights =
// //   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//   order: function (starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },
//   orderPizza: function (mainIngredients, ...otherIngredients) {
//     console.log(mainIngredients);
//     console.log(otherIngredients);
//   },

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

// // // sample destructuring

// // const [a, b, c, d] = restaurant.starterMenu;
// // console.log(a, b, c, d);

// // let [main, , secondary] = restaurant.categories;
// // console.log(main, secondary);

// // [main, secondary] = [secondary, main];
// // console.log(main, secondary);

// // const [starter, mainCourse] = restaurant.order(2, 0);
// // console.log(starter, mainCourse);

// // const nested = [2, 4, [5, 6]];
// // const [i, , [j, k]] = nested;
// // console.log(i, j, k);

// // // default values

// // const [p, q, r] = [8, 9];
// // console.log(p, q, r);
// // const [s = 1, t = 1, u = 1] = [8, 9];
// // console.log(s, t, u);

// // // default values - destructuring objects not just arrays. great for api
// // const { name, openingHours, categories } = restaurant;
// // console.log(name, openingHours, categories);

// // const {
// //   name: restaurantName,
// //   openingHours: hours,
// //   categories: tags,
// // } = restaurant;
// // console.log(restaurantName, hours, tags);

// // // Default values

// // const { menu = [], starterMenu: starters = [] } = restaurant;
// // console.log(menu, starters);

// // // Mutating Variables
// // let xA = 111;
// // let yA = 999;
// // const obj = { xA: 23, yA: 7, zA: 14 };
// // ({ xA, yA } = obj); //notice the entire declaration is wrapped in a parens since we are destructuring an object
// // console.log(xA, yA);

// // // Nested Objects

// // const {
// //   fri: { open, close },
// // } = openingHours;
// // console.log(open, close);

// // const menus = [...restaurant.mainMenu, ...restaurant.starterMenu];
// // console.log(menus);

// // // Rest Operator and Parameters
// // const [m, n, ...others] = [1, 2, 3, 4, 5];
// // console.log(m, n, others);

// // const [pizza, , risotto, ...otherFood] = [
// //   ...restaurant.mainMenu,
// //   ...restaurant.starterMenu,
// // ];

// // console.log(pizza, risotto, otherFood);

// // // rest operator on objects

// // const { sat, ...weekdays } = restaurant.openingHours;
// // console.log(sat, weekdays);

// // // Rest operator in functions !! Dynamic parameters

// // function add(...arr) {
// //   let sum = 0;
// //   for (let index = 0; index < arr.length; index++) {
// //     sum += arr[index];
// //   }
// //   console.log(sum);
// //   return sum;
// // }
// // const sumall = add(23, 76, 85, 45, 63);

// // restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');

// // // Short Circuiting

// // console.log(3 || 'Sandeep');
// // console.log('' || 'Sandeep');
// // console.log(true || 0);
// // console.log(false || 0);
// // console.log(undefined || null);

// // restaurant.numGuests = 23;
// // const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// // console.log(guests1);

// // const guests2 = restaurant.numGuests || 10;
// // console.log(guests2);

// // // Or Assignment operator
// // const rest1 = {
// //   name: 'Capri',
// //   // numGuests: 20,
// //   numGuests: 0,
// // };

// // const rest2 = {
// //   name: 'La Piazza',
// //   owner: 'Giovanni Rossi',
// // };
// // // rest1.numGuests = rest1.numGuests || 10;
// // // rest2.numGuests = rest2.numGuests || 10;

// // // rest1.numGuests ||= 10;
// // // rest2.numGuests ||= 10;

// // // console.log(rest1);
// // // console.log(rest2);

// // // nullish assignment operator if value is null or undefined). Since 0 NumGuests can be a valid value and we dont want to take default in rest 1 but ok for rest 2

// // rest1.numGuests ??= 10;
// // rest2.numGuests ??= 10;

// // // And assignment operator
// // // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // // rest2.owner = rest2.owner && '<ANONYMOUS>';

// // rest1.owner &&= '<ANONYMOUS>';
// // rest2.owner &&= '<ANONYMOUS>';

// // console.log(rest1);
// // console.log(rest2);
// // Coding Challenge #1

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// console.log(game.team1);
// console.log(game.team2);
// // Q1
// const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// //Q2

// const [gk1, ...fieldPlayers1] = players1;
// const [gk2, ...fieldPlayers2] = players2;
// console.log(gk1, fieldPlayers1);
// console.log(gk2, fieldPlayers2);

// // 03

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 04

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 05
// console.log(game.odds);
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1);
// console.log(team2);
// console.log(draw);

// // 06

// const printGoals = function (...players) {
//   console.log(players);
//   console.log(players.length);
// };
// printGoals(...allPlayers);

// // 07

// team1 < team2 && console.log(`Team 1 (${team1}) is more likely to win`);
// team1 > team2 && console.log(`Team 2 (${team2})is more likely to win`);

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) {
//   console.log(item);
// }

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}. ${el}`);
// }

// // Looping in objects
// const openingHours = restaurant.openingHours;
// const hoursKeys = Object.keys(openingHours);
// console.log(hoursKeys);

// const hoursValues = Object.values(openingHours);
// console.log(hoursValues);

// const hoursEntries = Object.entries(openingHours);
// console.log(hoursEntries);

// for (const [key, { open, close }] of hoursEntries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
console.log(game);
// Coding Challenge
// 1.

for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}. ${player}`);
}

// 2.

const oddsarr = Object.values(game.odds);
// console.log(oddsarr);
// const oddsavg = function (arr) {
//   let sum = 0;
//   for (let index = 0; index < arr.length; index++) {
//     sum += arr[index];
//   }
//   return sum / arr.length;
// };
// console.log(oddsavg(oddsarr));

// const odds = Object.values(game.odds);
let average = 0;
for (const odd of oddsarr) average += odd;
average /= oddsarr.length;
console.log(average);

// 3.

for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(team, odd);
  const teamStr = team === 'x' ? 'draw' : `victory for ${game[team]}`;
  console.log(`Odds of ${teamStr}: ${odd}`);
}

// 4.

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// Sets

const ordersSet = new Set(['Pizza', 'Pizza', 'Pasta', 'Risotto', 'Pasta']);

console.log(ordersSet);

console.log(new Set('Sandeep'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet);
