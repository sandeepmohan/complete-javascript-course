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
    The Koala's Win!!`)
} else if ((koalaAverageTD < dolphinsAverageTD) && (dolphinsAverageTD > 100)) {
    console.log(`The Koalas Average is: ${koalaAverageTD}
    The Dolphins Average is: ${dolphinsAverageTD}
    The Dolphin's Win!!`)
} else {
    console.log(`Neither Team Wins!`)
}

