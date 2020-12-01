import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';
let z = [];
let x = [];

$(document).ready(function() {
  $('#breweryInput').click(async function() {
    let street = $('#street').val();
    let city = $('#city').val();
    let state = $('#state').val();
    let zip = $('#zip').val();
    BreweryService.addressCoords(street, city, state, zip)
      .then(function(response) {
        x = response
      })
    let promise = BreweryService.findBrewery('co') 
      .then(function(response) {
        for (let i = 0; i < response.length ; i++) {
          BreweryService.addressCoords(response[i].street.replace(/ /g,"+"), response[i].city.replace(/ /g,"+"), 'Colorado', response[i].zip)
          .then(function(response) {
            z[i] = response.results[0].locations[0].displayLatLng;
          })
        }
      });
    await promise;
    console.log(z);
    console.log(x);
  });
});