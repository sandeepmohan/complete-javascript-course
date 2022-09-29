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

// Encapsulation and protection

// 1) Public Fields
// 2) Private Fields
// 3) Public Methods
// 4) Private Methods

class Account {
  // 1) Public fields (on instances not prototypes)
  locale = navigator.language;

  // 2) Private fields (on instances not prototypes)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.#movements = [];
    // this.locale = navigator.language;
  }

  // Public Interface

  // 3) Public Methods or Public Interface

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loand Approved`);
    }
    return this;
  }
}

const acc1 = new Account('Sandeep', 'USD', '1111');

// function ipAddressCounter(ip1, ip2) {
//   const ipa = Array.from(ip1.trim().split('.'), Number);
//   const ipb = Array.from(ip2.trim().split('.'), Number);
//   const iparr = [ipa, ipb];
//   console.log(iparr);
// }
// const ipcount = ipAddressCounter('10.0.1.0', '10.0.0.1');
// const ipc1 = 256 ** 3;
// console.log(ipc1);

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  getspeedUS() {
    return this.speed / 1.6;
  }
}
// class Student extends Person {
//     constructor(firstName, birthYear, course) {
//       super(firstName, birthYear);
//       this.course = course;
//     }

//     introduce() {
//       console.log(`My name is ${this.firstName} and I study ${this.course}`);
//     }
//   }

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate();
rivian.brake();
rivian.chargeBattery(60);
rivian.accelerate();
rivian.getspeedUS();
