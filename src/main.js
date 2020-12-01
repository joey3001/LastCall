import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { BreweryService } from './js/BreweryService.js';

$(document).ready(function() {
  $('#breweryInput').click(function() {
    BreweryService.findBrewery('co') 
      .then(function(response) {
        let z = [];
        for (let i = 0; i < response.length ; i++) {
          BreweryService.addressCoords(response[i].street.replace(/ /g,"+"), response[i].city.replace(/ /g,"+"), 'Colorado', response[i].zip)
          .then(function(response) {
            z[i] = response.results[0].locations[0].displayLatLng;
          })
        }
    });
  });
});




















