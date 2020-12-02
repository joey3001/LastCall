import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';

async function trial(breweryListPerState, stateName2, userDist,selector) {
  let breweryResult = [];
  let breweryLatLng = [];
  for (let i = 0; i < breweryListPerState.length; i++) {//TODO
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
    console.log(i);
    console.log(breweryListPerState.length);
    if(i === breweryListPerState.length-1) {
      for (let j = 0; j < breweryResult.length ; j++) { 
        $(selector).append('<li>' + breweryResult[j].name.name + '</li>');
      }
    }
  }
}

$(document).ready(function() {
  $('#breweryInput').submit(async function() {
    event.preventDefault();
    let userAddressLatLng = [];
    let breweryListPerState = [];
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
    trial(breweryListPerState, stateName2, userDist, '#output');
  });
});
