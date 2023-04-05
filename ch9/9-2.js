class Organization {
  constructor(data) {
    this.#name = data.name;
    this.#country = data.country;
  }
  get title() {
    return this._name;
  }
  set title(value) {
    this._name = value;
  }
  get country() {
    return this._country;
  }
  set country(value) {
    this._country = value;
  }
}
const organization = new Organization({
  name: '드림코딩',
  country: '대한민국',
});
