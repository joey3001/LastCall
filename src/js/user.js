export default class User {
  constructor() {
    this.beerLiked = [];
  }

  //method to find beer for user
  showBeerResult(color, ibu, clarity, flavor, beers) {
    for (let i = 0; i < beers.beersArray.length; i++) {
      if (flavor === beers.beersArray[i].flavor) {
        this.beerLiked.push(beers.beersArray[i]);
      }   
    }
    return this.beerLiked;
  }
}
