import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
import breweryPost from './js/breweryPost.js';

$(document).ready(function() {
  $('#breweryInput').submit(async function() {
    event.preventDefault();
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
    let response = await BreweryService.addressCoords(compass, street, city, stateName2, zip);
    let userAddressLatLng = response.results[0].locations[0].displayLatLng;
    let response2 = await BreweryService.findBrewery(stateAbv);
    breweryListPerState = response2.filter(brewery => (brewery.status === "Brewpub" || brewery.status === "Brewery"));
    breweryPost(breweryListPerState, stateName2, userDist, '#output', userAddressLatLng);
  });
});
