import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
let breweryLatLng = [];
let userAddressLatLng = [];
let breweryListPerState = [];
let breweryResult = [];

async function trial(breweryListPerState, stateName2, userDist,selector) {
  for (let i = 0; i < breweryListPerState.length;) {//TODO
  let response3 = await BreweryService.addressCoords("", breweryListPerState[i].street.replace(/ /g,"+"), breweryListPerState[i].city.replace(/ /g,"+"), stateName2, breweryListPerState[i].zip); 
  let nameDist = {
    distance: null,
    name: null,
  }
  breweryLatLng[i] = response3.results[0].locations[0].displayLatLng;
  let dLng = (breweryLatLng[i].lng - userAddressLatLng.lng);
  let dLat = (breweryLatLng[i].lat - userAddressLatLng.lat);
  let distance = 69 * Math.sqrt(Math.pow(dLng, 2) + Math.pow(dLat, 2));
  if (distance <= userDist) {
      nameDist.distance = distance;
      nameDist.name = breweryListPerState[i];
      breweryResult.push(nameDist);
    }
    breweryResult.sort(function(a,b) {
      return a.distance - b.distance;
    });
    alert(i); 
    alert(breweryResult.length); 
    alert(breweryListPerState.length); 
    if(breweryResult.length === breweryListPerState.length) {
      for (let i = 0; i < 20 ; i++) { 
        $(selector).append(breweryResult[i].name.name);
      }
    }
  } 
}


$(document).ready(function() {
  $('#breweryInput').submit(async function() {
    event.preventDefault();
    let compass = $('#compass').val();
    let street = $('#street').val().replace(/ /g,"+");
    let city = $('#city').val().replace(/ /g,"+");
    let stateArr = $('#state').val().split(', ');
    let stateAbv = stateArr[0];
    let stateName = stateArr[1];
    let stateName2 = stateName.replace(/ /g,"+");
    let zip = $('#zip').val().replace(/ /g,"+");
    let userDist = parseInt($('#userDist').val());
    let response = await BreweryService.addressCoords(compass, street, city, stateName2, zip)
    userAddressLatLng = response.results[0].locations[0].displayLatLng;
    let response2 = await BreweryService.findBrewery(stateAbv) 
    breweryListPerState = response2.filter(brewery => (brewery.status === "Brewpub" || brewery.status === "Brewery"));
    await trial(breweryListPerState, stateName2, userDist, '#output');
  });
});