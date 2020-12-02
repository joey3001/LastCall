import Beer from "./beerConstructor.js";

export default class Beers {
  constructor() {
    this.beersArray = [];
  }

  addBeer() {
    this.beersArray.push(Beer);
  }
}
