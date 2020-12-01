import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Beer from "../src/js/beerConstructor.js";

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
