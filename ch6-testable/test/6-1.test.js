import { printOwing } from '../6-1.js';

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
    'due 2/20/2022\n';
    expect(printOwing(invoice)).toBe(expected);
  });
});