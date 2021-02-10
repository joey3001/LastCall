import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BrewerySearchInfo from "./js/BrewerySearchInfo.js";
import UserInfo from "./js/UserInfo";

//Logic for confirming you are 21 on the opening page
$(".btn-no").click(function () {
  window.location.href = "http://google.com/";
});

//Logic for brewery finder
$("#addressInput").submit(async function () {
  event.preventDefault();

  //Remove margin filler 
  $('#marginFiller').css("display", "none");

  //Run 'loading' animation
  $('#cartoonBeer').fadeIn(1500).css("display","block");

  //Take input from user to construct args
  const street = $("#street").val().replace(/ /g, "+");
  const city = $("#city").val().replace(/ /g, "+");

  const stateArray = $("#state").val().split(", ");
  const stateAbv = stateArray[0];
  const stateName = stateArray[1].replace(/ /g, "+");
  const zip = $("#zip").val().replace(/ /g, "+");

  const searchRadius = parseInt($("#searchRadius").val());

  //Pass args into a constructor to house user info & get user lat & lon coordinates
  let userInfo = new UserInfo(street, city, zip, stateName, stateAbv, searchRadius);
  await userInfo.getCoords(); 

  // Pass user info into a constructor to perform operations with
  let brewerySearchInfo = new BrewerySearchInfo(userInfo);
  await brewerySearchInfo.setAlcoholStoreList(); 
  brewerySearchInfo.filterAlcoholStoresByBreweries();
  await brewerySearchInfo.addDistancetoBreweries();

  //End 'loading' animation & execute additional operations upon completion of the animation
  $('#cartoonBeer').fadeOut(1500, () => {
    brewerySearchInfo.setLocalBreweries(); 
    brewerySearchInfo.sortLocalBreweries();
    brewerySearchInfo.postLocalBreweries("#output"); 
  }); 
});