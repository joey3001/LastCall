import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ApiClient from "./js/ApiClient.js";
import BreweryFunctions from "./js/BreweryInfoByState.js";

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
  const userAddressInfo = await ApiClient.addressCoords(street, city, stateName, zip);
  const userCoords = userAddressInfo.results[0].locations[0].displayLatLng;

  const alcoholStoreList = await ApiClient.alcoholStoreList(stateAbv); 
  let breweryInfoByState = new BreweryInfoByState(alcoholStoreList, userCoords, stateName);
  breweryInfoByState.breweryStateFilter(); 
  await breweryInfoByState.addDistancetoBreweries(userCoords, stateName)
  breweryInfoByState.getLocalBreweries(searchRadius); 
  breweryInfoByState.sortLocalBreweries();
  breweryInfoByState.postLocalBreweries("#output"); 
});