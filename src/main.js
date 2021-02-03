import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApiCalls from "./js/ApiCalls.js";
import BreweryFunctions from "./js/BreweryFunctions.js";

//Logic for confirming you are 21 on the opening page
$(".btn-no").click(function () {
  window.location.href = "http://google.com/";
});

//Logic for brewery finder
$("#breweryInput").submit(async function () {
  event.preventDefault();
  const street = $("#street").val().replace(/ /g, "+");
  const city = $("#city").val().replace(/ /g, "+");

  const stateArray = $("#state").val().split(", ");
  const stateAbv = stateArray[0];
  const stateName = stateArray[1].replace(/ /g, "+");

  const zip = $("#zip").val().replace(/ /g, "+");

  const searchRadius = parseInt($("#searchRadius").val());
  const userAddressInfo = await ApiCalls.addressCoords(street, city, stateName, zip);
  const userAddressLatLng = userAddressInfo.results[0].locations[0].displayLatLng;

  const alcoholSalesListByState = await ApiCalls.findBrewery(stateAbv);
  const breweryListByState = BreweryFunctions.breweryStateFilter(alcoholSalesListByState);
  const filteredBreweriesByDistance = await BreweryFunctions.breweryDistanceFilter(breweryListByState, userAddressLatLng, stateName, searchRadius); 
  const sortedBreweriesByDistance = BreweryFunctions.breweryDistanceSorter(filteredBreweriesByDistance); 

  BreweryFunctions.breweryPost(sortedBreweriesByDistance, "#output"); 
});

