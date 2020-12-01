export default class Beer {
  constructor(color, ibu, clarity, flavor) {
    this.color = color;
    this.ibu = ibu;
    this.clarity = clarity;
    this.flavor = flavor;
    this.result = color + ibu + clarity + flavor;
  }
  showBeerResult() {
    if (this.result >= 700) {
      return `Sour Beer`;
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
