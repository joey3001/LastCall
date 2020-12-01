import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
let breweryLatLng = [];
let userAddressLatLng = [];
let breweryListPerState = [];
let breweryResult = [];
//let promise2;

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
    console.log(stateAbv);
    BreweryService.addressCoords(compass, street, city, stateName2, zip)
      .then(function(response) {
        userAddressLatLng = response.results[0].locations[0].displayLatLng;
      })
    let promise = BreweryService.findBrewery(stateAbv) 
      .then(async function(response) {
        breweryListPerState = response;
        for (let i = 0; i < 5 ; i++) { //TODO
          let promise2 = BreweryService.addressCoords(response[i].street.replace(/ /g,"+"), response[i].city.replace(/ /g,"+"),stateName2, response[i].zip)
          .then(function(response) {    
            breweryLatLng[i] = response.results[0].locations[0].displayLatLng;
          })
      await promise2;
      for (let i = 0; i < breweryListPerState.length; i++) {
      console.log('here');
      console.log(Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat))
      if (Math.abs(breweryLatLng[i].lat - userAddressLatLng.lat) <= 1 && Math.abs(breweryLatLng[i].lng - userAddressLatLng.lng) <= 1) {
        breweryResult.push(breweryListPerState[i]);
      }
    } 
        }
      });
    await promise;
    console.log(breweryLatLng.length)
    console.log(breweryResult)
    console.log(breweryLatLng);
    console.log(userAddressLatLng);
    console.log(breweryListPerState);
    console.log(breweryListPerState.length)
  });
});

