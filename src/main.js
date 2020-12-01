import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';

$(document).ready(function() {
  $('#breweryInput').click(function() {
    BreweryService.findBrewery('Portland') 
      .then(function(response) {
        console.log(response); 
    });   
    let y = []; 
    BreweryService.addressCoords('1600+Pennsylvania+Ave+NW', 'Washington', 'DC', '20500') 
      .then(function(response) {
        console.log(response.results[0].locations[0].displayLatLng.lat);
        console.log(response.results[0].locations[0].displayLatLng.lng);
        
        y[0] = response.results[0].locations[0].displayLatLng.lat;
        y[1] = response.results[0].locations[0].displayLatLng.lng;
      })
      console.log(y)
  });
});




















