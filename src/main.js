import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
let breweryLatLng = [];
let userAddressLatLng = [];
let breweryListPerState = [];
let breweryResult = [];

$(document).ready(function() {
  $('#breweryInput').submit(function() {
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
    BreweryService.addressCoords(compass, street, city, stateName2, zip)
      .then(function(response) {
        userAddressLatLng = response.results[0].locations[0].displayLatLng;
        BreweryService.findBrewery(stateAbv) 
          .then(function(response) {
            breweryListPerState = response.filter(brewery => (brewery.status === "Brewpub" || brewery.status === "Brewery"));
            for (let i = 0; i < 60; i++) {//TODO
              BreweryService.addressCoords("", response[i].street.replace(/ /g,"+"), response[i].city.replace(/ /g,"+"), stateName2, response[i].zip)
                .then(function(response) {    
                  let nameDist = {
                    distance: null,
                    name: null,
                  };
                  breweryLatLng[i] = response.results[0].locations[0].displayLatLng;
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
                  if (breweryResult.length === 20) { //TODO
                    for (let i = 0; i < 20 ; i++) { 
                      $('#output').append('<li><strong>Brewery name</strong>: ' + breweryResult[i].name.name + '</li>');
                      $('#output').append('<ul><strong>Distance</strong>: ' + breweryResult[i].distance.toFixed(1) + '</ul>');
                    }
                  } 
                });
            }
          });
      });
  });
});