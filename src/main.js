import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BrewerySearchInfo from "./js/brewerySearchInfo.js";
import UserInfo from "./js/userInfo";

//Logic for confirming you are 21 on the opening page
$(".btn-no").click(function () {
  window.location.href = "http://google.com/";
});

//Logic for brewery finder
$("#addressInput").submit(async function () {
  event.preventDefault();

  //Run 'loading' animation function
  $('#cartoonBeer').fadeIn(1500).css("display","block");

  //Take input from user to construct args
  const street = $("#street").val().replace(/ /g, "+");
  const city = $("#city").val().replace(/ /g, "+");

  const stateArray = $("#state").val().split(", ");
  const stateAbv = stateArray[0];
  const stateName = stateArray[1].replace(/ /g, "+");
  const zip = $("#zip").val().replace(/ /g, "+");

  const searchRadius = parseInt($("#searchRadius").val());

  //Pass args into a constructor to house user info & get user coordinates
  let userInfo = new UserInfo(street, city, zip, stateName, stateAbv, searchRadius);
  await userInfo.getCoords(); 

  // Pass user into a constructor to perform operations with
  let brewerySearchInfo = new BrewerySearchInfo(userInfo);
  await brewerySearchInfo.getAlcoholStoreList(); 
  brewerySearchInfo.filterAlcoholStoresByBreweries();
  await brewerySearchInfo.addDistancetoBreweries();

  //End 'loading' animation function & execute additional operations upon completion of the animation
  $('#cartoonBeer').fadeOut(1500, () => {
    brewerySearchInfo.getLocalBreweries(); 
    brewerySearchInfo.sortLocalBreweries();
    brewerySearchInfo.postLocalBreweries("#output", street, city, zip); 
  }); 
});