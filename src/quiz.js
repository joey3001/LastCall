import Brewery from "../src/js/breweryConstructor";
import Breweries from "../src/js/breweries";
import Beer from "../src/js/beerConstructor.js";

//creating new brewery
//const brewery1 = new Brewery(1, Brewery1, OR);
//const brewery2 = new Brewery(2, Brewery2, WA);

//creating array with breweries
//let breweries = new Breweries();
//breweries.addBrewery(brewery1);
//breweries.addBrewery(brewery2);
//breweris=[brewery1, brewery2];

const IPA = new Beer(IPA, 2, 4, 1, 100);
const Pilsner = new Beer(Pilsner, 1, 3, 1, 200);
const Hefewiezen = new Beer(Hefewiezen, 2, 1, 2, 300);
const PaleAle = new Beer(PaleAle, 3, 2, 2, 400);
const BrownAle = new Beer(BrownAle, 4, 3, 2, 500);
const Stout = new Beer(Stout, 5, 2, 2, 600);
const SourBeer = new Beer(SourBeer, 7, 1, 2, 700);

//let beers = new Beer();
//beers.addBeer(IPA);
//beers.addBeer(Pilsner);
//beers.addBeer(Hafewiezen);
//beers.addBeer(PaleAle);
//beers.addBeer(BrownAle);
//beers.addBeer(Stout);
//beers.addBeer(SourBeer);

//beers=[{IPA}, {Pilsner}]

//color, ibu, clarity, flavor;

$(document).ready(function () {
  $("#quiz").submit(function (event) {
    event.preventDefault();

    const color = parseInt($("input:radio[name=color]:checked").val());
    const ibu = parseInt($("input:radio[name=ibu]:checked").val());
    const clarity = parseInt($("input:radio[name=clarity]:checked").val());
    const flavor = parseInt($("input:radio[name=flavor]:checked").val());
    const userBeer = new Beer(color, ibu, clarity, flavor);
    const result = userBeer.showBeerResult();

    //let result = user.showBeerResult(color, ibu, clarity, flavor);
    $("#result").text(`You should try ${result}.`);
  });
});
