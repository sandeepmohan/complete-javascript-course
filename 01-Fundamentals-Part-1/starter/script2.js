const hasDriversLicense = true;
const hasGoodVision = true;
const isTired = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);


if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log(`Sarah is able to drive!`);
} else {
    console.log(`Someone else should drive...`);
};

// Coding Challenge 3

const koalaAverageTD = (109 + 95 + 123) / 3;
const dolphinsAverageTD = (97 + 112 + 101) / 3;
if (koalaAverageTD === dolphinsAverageTD) {

    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    It's a DRAW!!`);

} else if (koalaAverageTD > dolphinsAverageTD) {
    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    The Koala's Win!!`);
} else {
    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    The Dolphin's Win!!`);
};

if ((koalaAverageTD > dolphinsAverageTD) && (koalaAverageTD > 100)) {
    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    The Koala's Win!!`);
} else if ((koalaAverageTD < dolphinsAverageTD) && (dolphinsAverageTD > 100)) {
    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    The Dolphin's Win!!`);
} else {
    console.log(`Neither Team Wins!`);
};

const day = 'monday';
switch (day) {
    case 'monday':
        console.log(`It's Monday.`);
        break;
    case 'tuesday':
        console.log(`It's Tuesday.`);
        break;
    case 'wednesday':
    case 'thursday':
    case 'friday':
        console.log(`The remainder of the workweek.`);
        break;
    case 'saturday':
    case 'sunday':
        console.log(`Its the weekend!!`);
        break;
    default:
        console.log(`Not a valid day`);
        break;
};

const age = 23;
// age >= 18 ? console.log(`I like to drink wine`) : console.log(`I like to drink water`);

const drink = age >= 18 ? `wine` : `water`;
console.log(drink);

// coding challenge #4

const billAmount = 430;
const tip = (billAmount >= 50 && billAmount <= 300) ? (billAmount * 0.15) : (billAmount * 0.20);
const totalBill = billAmount + tip;
console.log(tip);
console.log(`The bill was ${billAmount}, the tip was ${tip}, and the total bill was ${totalBill}`);


