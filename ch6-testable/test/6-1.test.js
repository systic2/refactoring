import { printOwing } from '../6-1.js';

class Console {
  #content = '';
  constructor() {

  }
  log(message) {
    this.#content += `${message}\n`;
  }
  get content() {
    return this.#content;
  }
}

class Clock {
  constructor() {

  }
  get today() {
    return {
      getFullYear() {
        return 2023;
      },
      getMonth() {
        return 4;
      },
      getDate() {
        return 18;
      },
    }
  }
}


describe('printOwing', () => {
  it('should print owing', () => {
    const invoice = {
      orders: [{ amount: 2 }, { amount: 5 }],
      customer: '엘리',
    };
    const expected = 
    '***********************\n' +
    '**** Customer Owes ****\n' +
    '***********************\n' +
    'name: 엘리\n' +
    'amount: 7\n' +
    'due: 2023. 6. 17.\n';
    const console = new Console();
    const clock = new Clock();
    printOwing(invoice, console, clock);
    expect(console.content).toBe(expected);
  });
});