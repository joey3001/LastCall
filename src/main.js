import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Beer from "../src/js/beerConstructor.js";
import Beers from "../src/js/beers.js";
import User from "../src/js/user.js";

//creating new brewery
//const brewery1 = new Brewery(1, Brewery1, OR);
//const brewery2 = new Brewery(2, Brewery2, WA);

//creating array with breweries
//let breweries = new Breweries();
//breweries.addBrewery(brewery1);
//breweries.addBrewery(brewery2);
//breweris=[brewery1, brewery2];

const IPA = new Beer(1, "IPA", 2, 4, 1, 100);
const Pilsner = new Beer(2, "Pilsner", 1, 3, 1, 200);
const Hefewiezen = new Beer(3, "Hefewiezen", 2, 1, 2, 300);
const PaleAle = new Beer(4, "Pale Ale", 3, 2, 2, 400);
const BrownAle = new Beer(5, "Brown Ale", 4, 3, 2, 500);
const Stout = new Beer(6, "Stout", 5, 2, 2, 600);
const SourBeer = new Beer(7, "Sour Beer", 7, 1, 2, 700);

let beers = new Beers();
beers.addBeers(IPA);
beers.addBeers(Pilsner);
beers.addBeers(Hefewiezen);
beers.addBeers(PaleAle);
beers.addBeers(BrownAle);
beers.addBeers(Stout);
beers.addBeers(SourBeer);

//beers=[{IPA}, {Pilsner}]

//color, ibu, clarity, flavor;

$(document).ready(function () {
  $("#quiz").submit(function (event) {
    event.preventDefault();

    const userColor = parseInt($("input:radio[name=color]:checked").val());
    const userIbu = parseInt($("input:radio[name=ibu]:checked").val());
    const userClarity = parseInt($("input:radio[name=clarity]:checked").val());
    const userFlavor = parseInt($("input:radio[name=flavor]:checked").val());
    console.log(userColor);
    console.log(userIbu);
    console.log(userClarity);
    console.log(userFlavor);

    let user = new User();
    user.showBeerResult(userColor, userIbu, userClarity, userFlavor, beers);
    $("#result").text(`You should try ${user.beerLiked[0].name}.`);
    
  });
});
