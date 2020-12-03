export default class User {
  constructor() {
    this.beersLiked = [];
  }

  //method to find beer for user
  showBeerResult(color, ibu, clarity, flavor, beers) {
    for (let i = 0; i < beers.beersArray.length; i++) {
      let matching = 0;
      if (color === beers.beersArray[i].color) {
        matching++;
      }
      if (ibu === beers.beersArray[i].ibu) {
        matching++;
      }
      if (flavor === beers.beersArray[i].flavor) {
        matching++;
      }
      if (clarity === beers.beersArray[i].clarity) {
        matching++;
      }

      if (matching >= 2) {
        this.beersLiked.push(beers.beersArray[i]);
      } 
    }
  }
}