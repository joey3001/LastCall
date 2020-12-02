import Beers from "./beers.js";

export default class User {
  constructor() {
    this.beerLiked = [];
  }

  //method to find beer for user
  showBeerResult(color, ibu, clarity, flavor, beers) {
    console.log(beers);
    for (let i = 0; i < Beers.beersArray.length; i++) {
      if (flavor === Beers.beersArray[i].flavor) {
        console.log(flavor);
        console.log(Beers.beersArray[i].flavor);
        this.beerLiked.push(Beers.beersArray[i]);
      }
      return this.beerLiked[0];
    }
  }
}
//this.beerLiked={1, "IPA",1,1,1,100}
// const IPA = new Beer(1, "IPA", 2, 4, 1, 100);
// const Pilsner = new Beer(2, "Pilsner", 1, 3, 1, 200);
// const Hefewiezen = new Beer(3, "Hefewiezen", 2, 1, 2, 300);
// const PaleAle = new Beer(4, "PaleAle", 3, 2, 2, 400);
// const BrownAle = new Beer(5, "BrownAle", 4, 3, 2, 500);
// const Stout = new Beer(6, "Stout", 5, 2, 2, 600);
// const SourBeer = new Beer(7, "SourBeer", 7, 1, 2, 700);
// const beer8= new Beer(6,"beer",6,1,1,700)

// beerLiked=[{SourBeer}, {beer8}]
