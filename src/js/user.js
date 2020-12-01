export default class User {
  constructor() {
    this.result = 0;
    //this.beerLiked = "";
  }

  //method to find beer for user
  showBeerResult() {
    //this.result=color + ibu + clarity + flavor;
    //sugeestBeers(1, 1,1,100)

    if (this.result >= 700) {
      return `Sour Beer`; //this.beerLiked=SourBeer;
    } else if (this.result >= 600) {
      return `Stout`;
    } else if (this.result >= 500) {
      return `Brown Ale`;
    } else if (this.result >= 400) {
      return `Pale Ale`;
    } else if (this.result >= 300) {
      return `Hefewiezen/Wheat Beer`;
    } else if (this.result >= 200) {
      return `Pilsner`;
    } else if (this.result >= 100) {
      return `IPA`;
    }
  }
}
