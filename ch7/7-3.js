export class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  isHighPriority() {
    return this.priority.higherThan(new Priority('normal'));
  }
}

class Priority {
  #value;
  constructor(value) {
    if(Priority.legalValues().includes(value)) {
      this.#value = value;
    } else {
      throw new Error(`${value} is invalid for Priority`);
    }
  }
  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }

  get index() {
    return Priority.legalValues().indexOf(this.#value);
  }

  equals(other) {
    return this.index === other.index;
  }

  higherThan(other) {
    return this.index > other.index
  }


}

const orders = [
  new Order({ priority: new Priority('normal') }),
  new Order({ priority: new Priority('high') }),
  new Order({ priority: new Priority('rush') }),
];

const highPriorityCount = orders.filter((o) => o.isHighPriority()).length;
console.log(highPriorityCount);