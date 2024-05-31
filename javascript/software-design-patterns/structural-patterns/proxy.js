// Proxy Pattern: Provides a substitute or placeholder for another object to control access to it
// Real subject

// ==== Example 1 - First way =====
const realObject = { name: "Mr", number: "+318976876" };

const proxyObject = new Proxy(realObject, {
  get(target, key) {
    console.log("The data is accessed: >>> ", target, key);
    return realObject[key];
  },
  set(target, key, value) {
    console.log("The data changed: >>> ", target, key, value);
    Reflect.set(target, key, value);
    realObject[key] = value;
  },
});

proxyObject.number;
proxyObject.number = "+906235762";

// ==== Example 2 - Second way =====
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Insufficient funds.");
    }
  }

  getBalance() {
    console.log(`Current balance: ${this.balance}`);
  }
}

// Proxy
class SecureBankAccountProxy {
  constructor(realAccount, accessLevel) {
    this.realAccount = realAccount;
    this.accessLevel = accessLevel;
  }

  deposit(amount) {
    if (this.accessLevel === "admin" || this.accessLevel === "user") {
      this.realAccount.deposit(amount);
    } else {
      console.log("Access denied. You do not have permission to deposit.");
    }
  }

  withdraw(amount) {
    if (this.accessLevel === "admin" || this.accessLevel === "user") {
      this.realAccount.withdraw(amount);
    } else {
      console.log("Access denied. You do not have permission to withdraw.");
    }
  }

  getBalance() {
    if (this.accessLevel === "admin" || this.accessLevel === "user") {
      this.realAccount.getBalance();
    } else {
      console.log("Access denied. You do not have permission to check balance.");
    }
  }
}

// Client code
const bankAccount = new BankAccount(1000);
const adminProxy = new SecureBankAccountProxy(bankAccount, "admin");
const userProxy = new SecureBankAccountProxy(bankAccount, "user");
const guestProxy = new SecureBankAccountProxy(bankAccount, "guest");

adminProxy.deposit(500); // Output: Deposited 500. New balance: 1500
userProxy.withdraw(200); // Output: Withdrawn 200. New balance: 1300
guestProxy.getBalance(); // Output: Access denied. You do not have permission to check balance.
