import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApiClient from "./js/ApiClient.js";
import BreweryInfo from "./js/breweryInfo.js";

//Logic for confirming you are 21 on the opening page
$(".btn-no").click(function () {
  window.location.href = "http://google.com/";
});

//Logic for brewery finder
$("#addressInput").submit(async function () {
  event.preventDefault();

  //Run 'loading' animation function
  $('#cartoonBeer').addClass('animate');

  //Take input from user to construct args
  const street = $("#street").val().replace(/ /g, "+");
  const city = $("#city").val().replace(/ /g, "+");

  const stateArray = $("#state").val().split(", ");
  const stateAbv = stateArray[0];
  const stateName = stateArray[1].replace(/ /g, "+");
  const zip = $("#zip").val().replace(/ /g, "+");

  const searchRadius = parseInt($("#searchRadius").val());

  //Use Mapquest Api to get Lat/Long coordinates for user's address 
  const userAddressInfo = await ApiClient.addressCoords(street, city, stateName, zip);
  const userCoords = userAddressInfo.results[0].locations[0].displayLatLng;

  //Use Beermapping Api to get a list of all alcohol stores in the user's state
  const alcoholStoreList = await ApiClient.alcoholStoreList(stateAbv); 

  // Pass args into a constructor to perform operations with
  let breweryInfo = new BreweryInfo(alcoholStoreList, userCoords, stateName, searchRadius);
  breweryInfo.filterAlcoholStoresByBreweries(); 
  await breweryInfo.addDistancetoBreweries();

  //End 'loading' animation function
  $("#cartoonBeer").fadeIn(2000, () => {
    $('#cartoonBeer').removeClass('animate'); 
  }); 

  //perform additional operations with constructor
  breweryInfo.getLocalBreweries(); 
  breweryInfo.sortLocalBreweries();
  breweryInfo.postLocalBreweries("#output", street, city, zip); 
});