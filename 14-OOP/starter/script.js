'use strict';

// // 1. New {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function automaticallr return {}

// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Instance Methods - Never do this though. Better to use Prototypes and Prototypal Inheritance

//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const sandeep = new Person('Sandeep', 1972);
// console.log(sandeep);

// // Prototypes

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// console.log(sandeep.calcAge());

// Person.prototype.spieces = 'Homo Sapiens';

// console.log(sandeep.spieces);

// console.log(sandeep.hasOwnProperty('firstName'));
// console.log(sandeep.hasOwnProperty('spieces'));

// console.log(sandeep.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(sandeep.__proto__.__proto__);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// console.log(arr.__proto__);

// // Coding Challenge #1

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   console.log(this.speed + 10);
// };

// Car.prototype.brake = function () {
//   console.log(this.speed - 5);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// mercedes.accelerate();
// mercedes.brake();
// bmw.accelerate();
// bmw.brake();
// bmw.brake();
// bmw.accelerate();

// // ES6 Classes - same as protypal but new syntax

// class Person {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     // const currYear = Date.now();
//     console.log(2023 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }
//   // Static Methods (do not inherit)

//   static hey() {
//     console.log('Hey there 👋🏼');
//     // console.log(this);
//   }
// }

// const anjali = new Person('Anjali', 2005);
// anjali.calcAge();
// const uma = new PersonCl('Uma', 2008);
// uma.calcAge();

// // 1. Classes are not hoisted!!
// // 2. Class are first-class citizens
// // 3. Classes are executed in strict mode
// PersonCl.hey();
// // anjali.hey();

// // Coding Challenge #2
// class CarES {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   get speedUS() {
//     console.log(`${this.speed / 1.6} miles per hour`);
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
//   brake() {
//     console.log(this.speed - 5);
//   }
//   accelerate() {
//     console.log(this.speed + 10);
//   }
// }

// const ford = new CarES('Ford', 120);
// ford.accelerate();
// ford.brake();
// ford.speedUS = 200;
// ford.accelerate();

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);

//   this.course = course;
// };

// // Linking Prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// console.dir(Student);
// const sandeep = new Student('Sandeep', 2009, 'Computer Science');
// // sandeep.introduce();
// // sandeep.calcAge();

class CarES {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    console.log(`${this.speed / 1.6} miles per hour`);
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  brake() {
    console.log(this.speed - 5);
  }
  accelerate() {
    console.log(this.speed + 10);
  }
}

const EV = function (make, speed, charge) {
  new CarES(this, make, speed);

  this.charge = charge;
};
EV.prototype = Object.create(CarES.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const teslaS = new EV('Tesla', 120, 23);

console.log(teslaS);
const tesla3 = new EV('Tesla', 120, 23);
console.log(tesla3);

// Inheritance using ES6 classes

class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    // const currYear = Date.now();
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
  // Static Methods (do not inherit)

  static hey() {
    console.log('Hey there 👋🏼');
    // console.log(this);
  }
}

class Student extends Person {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }
}

const martha = new Student('Martha', 2020, 'Computer Science');
martha.calcAge();
martha.introduce();
console.log(martha);

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstname, birthYear, course) {
  PersonProto.init.call(this, firstname, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const sandeep = Object.create(StudentProto);
sandeep.init('Sandeep', 1972, 'Computer Science');
sandeep.introduce();
sandeep.calcAge();

// Class Example

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = this.movements;
    this.locale = navigator.language;
  }

  // Public Interface

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loand Approved`);
    }
  }
}
