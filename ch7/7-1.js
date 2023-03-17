class Organization {
  #name;
  #country;
  #data;
  constructor(data) {
    this.#data = data;
    this.#name = data.name;
    this.#country = data.country;
  }

  get name() {
    return this.#name;
  }

  // set name(value) {
  //   this.#name = value;
  // }

  get country() {
    return this.#country;
  }

  // set country(value) {
  //   this.#country = value;
  // }

  get rawData() {
    return { ...this.#data }; // 얕은복사, cloneDeep
  }

  // set 있는 경우
  // get rawData() {
  //   return { name: this.#name, country: this.#country, }; // 얕은복사, cloneDeep
  // }
}
const organization = new Organization({
  name: 'Acme Gooseberries',
  country: 'GB',
});

console.log(organization.name);
console.log(organization.country);
