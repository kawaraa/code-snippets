let num: number = 10; // accept any number
let limitNum: 10 = 10; // accept a number up to 10

// Type assertion
let someValue: any = "Hello";
const strLength = (someValue as string).length;

// Union Types
type Quantity = 10 | 20;
let specificNum: Quantity = 10; // accept only 10 or 20 numbers
type Metric = "cm" | "inch";
let unit: Metric = "cm"; // accept only cm or inch

enum Sizes {
  Small,
  Medium,
  Large,
}
console.log(Sizes.Small); // => 0

// Or

enum Sizes2 {
  Small = "S",
  Medium = "M",
  Large = "L",
}

const shoes = {
  size: Sizes.Small,
};
const shoes2 = {
  size: Sizes.Medium,
};

// If "const" is used like following, then tsc will generate optimized code.
// const enum Sizes = {}

// tup: this guy explained it very clear: https://www.youtube.com/watch?v=tHSstkiVbc8
let arr: [string, number] = ["", 243];
arr[0] = "";
arr[1] = 1312;

let tup: [string, number];
tup = ["", 13];

type Employee = {
  readonly id: number;
  name: string;
  email?: string;
  retire: (a: Date | string, b?: number) => void;
};
const employee: Employee = {
  id: 13,
  name: "A",
  retire: function (date, timeMilliseconds) {
    if (!timeMilliseconds) return date;
    return timeMilliseconds;
  },
};
employee.retire(new Date());

class Invoice {
  client: string;
  details: string;
  private amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }

  format() {
    return `${this.client} ${this.details} ${this.amount}`;
  }
}
// or
class Invoice2 {
  constructor(readonly client: string, private details: string, public amount: number) {}
}

const invoice = new Invoice("Mario", "Work on Mario Website", 10);
const invoices: Invoice[] = [];
invoices.push(invoice);

interface IsPerson {
  name: string;
  age: number;
  speak: (text: string) => void;
  spend: (amount: number) => number;
}

const me: IsPerson = {
  name: "",
  age: 10,
  speak: function (text) {
    console.log(text);
  },
  spend: function (amount) {
    return amount;
  },
};

interface IsInvoice {
  format(): string;
}

class Invoice3 implements IsInvoice {
  constructor(readonly client: string, private details: string, public amount: number) {}
  format() {
    return `${this.client} ${this.details} ${this.amount}`;
  }
}

const invoices2: IsInvoice[] = [];

// Generic
// This guy explained it in a simple way: https://www.youtube.com/watch?v=IOzkOXSz9gE

interface Resource2<T> {
  uid: number;
  name: string;
  data: T;
}
// interface Resource2<A, B> { uid: A,name: B}
const newResource: Resource2<String> = { uid: 243, name: "", data: "" };
const newResource2: Resource2<Object> = { uid: 243, name: "", data: {} };
const newResource3: Resource2<string[]> = { uid: 243, name: "", data: [] };

interface Resource {
  name: string;
  data: object;
}

// Example 1
const addUID = <T>(obj: T) => {
  return { ...obj, id: Math.floor(Math.random() * 100) };
};
const newObj = addUID([]); // Accept all types

// Example 2
const addUID2 = <T extends object>(obj: T) => {
  return { ...obj, id: Math.floor(Math.random() * 100) };
};
const newObj2 = addUID2({}); // Accept only object type

// Example 3
const addUID3 = <T extends Resource>(obj: T) => {
  return { ...obj, id: Math.floor(Math.random() * 100) };
};
const newObj3 = addUID3({ name: "", data: {} }); // Accept only object type of Resource

// Asynchronous
async function delay(ms: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}
async function delayS(ms: number): Promise<any> {
  return new Promise((res, rej) => {
    setTimeout(() => res(ms), ms);
  });
}
